const { createDfuseClient, waitFor } = require("@dfuse/client")

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY,
  network: "mainnet.eth.dfuse.io",
})

const stream = await client.graphql(`subscription {
  searchTransactions(lowBlockNum:-1, indexName:CALLS query: "-value:0") {
        node { hash matchingCalls { from to value(encoding:ETHER) } }
  }}`, (message) => {
    if (message.type === "data") {
      const { undo, node: { hash, value, matchingCalls }} = message.data.searchTransactions
      matchingCalls.forEach(({ from, to, value }) => {
        console.log(`Transfer ${from} -> ${to} [${value} Ether]${undo ? " REVERTED" : ""}`)
      })
    }
  })

await waitFor(5000)
client.release()

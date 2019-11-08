const { createDfuseClient, waitFor } = require("@dfuse/client")

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY,
  network: "mainnet.eth.dfuse.io",
})

const stream = await client.graphql(`subscription {
  searchTransactions(indexName:CALLS query: "method:\\"transfer(address,uint256)\\"") {
    node { from to balances:balanceChanges {
      address new:newValue(encoding: ETHER) old:oldValue(encoding: ETHER)
    }
  }}}`, {
  onMessage: ({ type, data }) => {
    if (type === 'data') {
      const { from, to, balances } = data.searchTransactions.node
      const print = (balance) => `${balance.new-balance.old} (${balance.address})`
      console.log(`${from} -> ${to}`, balances.map(print))
  }}
})

await waitFor(5000)
client.release()

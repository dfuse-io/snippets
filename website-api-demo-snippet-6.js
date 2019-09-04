const { createDfuseClient, waitFor } = require("@dfuse/client@0.3.0-rc.1")

const config = { apiKey: process.env.DFUSE_API_KEY, network: "mainnet.eth.dfuse.io" }
const client = createDfuseClient(config);

const stream = await client.graphql(`subscription {
  searchTransactions(query: "method:\\"transfer(address,uint256)\\"") {
    node { from to balances:balanceChanges {
      address new:newValue(encoding: ETHER) old:oldValue(encoding: ETHER)
    }
  }}}`, {
  onMessage: ({ type, data }) => {
    if (type === 'data') {
      const { from, to, balances } = data.searchTransactions.node
      const showBalance = (balance) => `${balance.new-balance.old} (${balance.address})`
      console.log(`${from} -> ${to} [${balances.map(showBalance).join(", ")}]`)
  }}
})

await waitFor(5000)
await stream.close()

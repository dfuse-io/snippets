const { createDfuseClient } = require("@dfuse/client@0.3.0-rc.1")

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY,
  network: "mainnet.eth.dfuse.io",
})

const query = "from: b1690c08e213a35ed9bab7b318de14420fb57d8c"
const resp = await client.graphql(`{
  searchTransactions(query: "${query}", limit: 10, sort: DESC) {
    edges { node { hash from to } }
  }
}`)

const { edges } = resp.data.searchTransactions
edges.map(({ node }) => `https://ethq.app/tx/${node.hash}`)

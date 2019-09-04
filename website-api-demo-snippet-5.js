const { createDfuseClient } = require("@dfuse/client@next")

const config = { apiKey: process.env.DFUSE_API_KEY, network: "mainnet.eth.dfuse.io" }
const client = createDfuseClient(config)

const query = "from: b1690c08e213a35ed9bab7b318de14420fb57d8c"
const resp = await client.graphql(`{
  searchTransactions(query: "${query}", limit: 10, sort: DESC) {
    edges { node { hash from to } }
  }
}`)

const { edges } = resp.data.searchTransactions
edges.map(({ node }) => `https://ethq.app/tx/${node.hash}`)

const { createDfuseClient } = require("@dfuse/client")

const account = "eoscanadacom"

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
})

const resp = await client.searchTransactions(`auth:${account}`, {
  limit: 5,
  sort: "desc",
})

console.log(`Your last 5 transactions`)
if (!resp.transactions || resp.transactions.length <= 0) {
    console.log("Oops nothing found")
    return
}
resp.transactions.map((result) => `https://eosq.app/tx/${result.lifecycle.id}`)

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

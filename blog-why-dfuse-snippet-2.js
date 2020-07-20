
const { createDfuseClient } = require("@dfuse/client")

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet.eos.dfuse.io"
})

const opts = { limit: 10, sort: "desc" }
const resp = await client.searchTransactions("auth:eoscanadacom -action:claimrewards -data.from:eosio.vpay -data.from:eosio.bpay", opts)

console.log(`claimrewards`);
(resp.transactions || []).map((result) => `https://eosq.app/tx/${result.lifecycle.id}`)

// Click "▶ run" to try this code right here and see `dfuse` in action right now.


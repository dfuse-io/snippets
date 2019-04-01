const { createDfuseClient } = require("@dfuse/client")

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

const resp = await client.stateTable("eosio.token", "eoscanadacom", "accounts")
const { balance } = resp.rows[0].json

console.log(`Balance: ${balance} (#${resp.up_to_block_num})`)

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

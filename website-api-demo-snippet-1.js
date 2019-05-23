const { createDfuseClient } = require("@dfuse/client")

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

//Replace with your account
const resp = await client.stateTable("eosio.token", "eoscanadacom", "accounts")
const { balance } = resp.rows[0].json

const message = `Balance: ${balance} (#${resp.up_to_block_num})`

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

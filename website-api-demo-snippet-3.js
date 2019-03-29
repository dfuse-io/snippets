const { 
  createDfuseClient, waitFor, InboundMessageType 
} = require("@dfuse/client")

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

const data = { code: "eosio", scope: "eosio", table: "global", json: true }
const stream = await client.streamTableRows(data, (message) => {
  if (message.type === InboundMessageType.TABLE_DELTA) {
    const { dbop, block_num } = message.data
    const { total_ram_stake, total_unpaid_blocks } = dbop.new.json
    const ram_stake = `Total RAM Stake ${total_ram_stake}`
    const unpaid_blocks = `Total Unpaid Block Count ${total_unpaid_blocks}`
    console.log(`Global state change @ #${block_num}`)
    console.log(`[${ram_stake}, ${unpaid_blocks}]`)
  }
})

await waitFor(5000)
await stream.unlisten()
console.log("Stream is closed")

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

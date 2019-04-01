const { createDfuseClient, waitFor } = require("@dfuse/client")

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

const data = { code: "eosio", scope: "eosio", table: "global", json: true }
const stream = await client.streamTableRows(data, (message) => {
  if (message.type === "table_delta") {
    const { total_ram_stake, total_unpaid_blocks } = message.data.dbop.new.json
    
    console.log(`Global State Change (#{message.data.block_num})`)
    console.log(`- Total RAM Stake ${total_ram_stake}`)
    console.log(`- Total Unpaid Block Count ${total_unpaid_blocks}`)
  }
})

await waitFor(5000)
await stream.close()

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

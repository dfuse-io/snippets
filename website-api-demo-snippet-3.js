const { createDfuseClient, waitFor, InboundMessageType } = require("@dfuse/client")

try {
  const client = createDfuseClient({ apiKey: process.env.DFUSE_API_KEY, network: "mainnet" });
  
  const data = { code: "eosio", scope: "eosio", table: "global", json: true }
  const stream = await client.streamTableRows(data, (message) => {
    if (message.type === InboundMessageType.TABLE_DELTA) {
      const { dbop, block_num } = message.data
      const { total_ram_stake, total_unpaid_blocks } = dbop.new.json
      const state = `Total RAM Stake ${total_ram_stake}, Total Unpaid Block Count ${total_unpaid_blocks}`

      console.log(`Global state change @ #${block_num} [${state}]`)
    }
  })

  await waitFor(5000)
  await stream.unlisten()

  console.log("Stream is closed")
} catch (error) {
  console.log("An error occurred", error)
}

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

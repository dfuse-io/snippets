const { 
  createDfuseClient, InboundMessageType, waitFor
} = require("@dfuse/client");

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet",
});

const stream = client.streamActionTraces({ 
  account: "eosio.token", action_name: "transfer"}, (message) => {
    if (message.type === "action_trace") {
      const { from, to, quantity, memo } = message.data.trace.act.data
      console.log(`${from}->${to} ${quantity} (${memo})`);
    }
});

await waitFor(5000)
await stream.unlisten()
console.log("Stream is closed")

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

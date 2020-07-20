const { createDfuseClient, waitFor } = require("@dfuse/client");

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet.eos.dfuse.io",
});

const data = { account: "eosio.token", action_name: "transfer" }
const stream = client.streamActionTraces(data, (message) => {
    if (message.type === "action_trace") {
      const { from, to, quantity, memo } = message.data.trace.act.data
      console.log(`${from} -> ${to} ${quantity} (${memo})`);
    }
});

await waitFor(5000)
await stream.close()

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

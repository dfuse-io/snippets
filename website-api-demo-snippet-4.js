const { 
  createDfuseClient, 
  InboundMessageType,
} = require("@dfuse/client")

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, 
  network: "mainnet",
});

client.streamActionTraces({ 
  account: "eosio.token",
  action_name: "transfer" 
}, (message) => {
  if (message.type === "action_trace") {
    const { 
      from, to, quantity, memo 
    } = message.data.trace.act.data
    
    console.log(`${from}->${to} ${quantity} (${memo})`)
  }
}).catch((error) => {
  console.log("An error occurred.", error)
});

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

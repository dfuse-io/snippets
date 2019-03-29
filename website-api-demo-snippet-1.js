const { createDfuseClient } = require("@dfuse/client")

const account = "eoscanadacom"
const fixedBlockNum = 42500250

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

const { 
 balance: atBalance, blockNum: atBlockNum 
} = await fetchBalance(client, fixedBlockNum)
console.log(`Your balance at block ${atBlockNum} was ${atBalance}`)

const { 
  balance: curBalance, blockNum: curBlockNum 
} = await fetchBalance(client)
console.log(`Your current balance at block ${curBlockNum} is ${curBalance}`)

async function fetchBalance(client, atBlock) {
  const opts = { blockNum: atBlock === undefined ? undefined : atBlock }
  const r = await client.stateTable("eosio.token", account, "accounts", opts)
  
  return { 
    balance: r.rows[0].json.balance, 
    blockNum: r.up_to_block_num || atBlock 
  }
}

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

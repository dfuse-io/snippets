const { createDfuseClient } = require("@dfuse/client")

const account = "eoscanadacom"
const fixedBlockNum = 42500250

const client = createDfuseClient({ 
  apiKey: process.env.DFUSE_API_KEY, network: "mainnet" 
});

try {
  const { 
    balance: atBalance, 
    blockNum: atBlockNum 
  } = await fetchBalance(client, fixedBlockNum)
  const { 
    balance: currentBalance, 
    blockNum: currentBlockNum 
  } = await fetchBalance(client)

  console.log(`Your balance at block ${atBlockNum} was ${atBalance}`)
  console.log(`Your current balance at block ${currentBlockNum} is ${currentBalance}`)
} catch (error) {
  console.log("An error occurred", error)
}

async function fetchBalance(client, atBlock) {
  const opts = { blockNum: atBlock === undefined ? undefined : atBlock }
  const resp = await client.stateTable("eosio.token", account, "accounts", opts)

  return { balance: resp.rows[0].json.balance, blockNum: resp.up_to_block_num || atBlock }
}

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

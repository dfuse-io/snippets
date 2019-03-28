const { createDfuseClient } = require("@dfuse/client")

const account = "eoscanadacom"
const client = createDfuseClient({ apiKey: process.env.DFUSE_API_KEY, network: "mainnet" })

try {
    const response = await client.searchTransactions(`auth:${account}`, {
        limit: 10,
        sort: "desc",
    })

    console.log(`Your latest 10 transactions`)
    if (!response.transactions || response.transactions.length <= 0) {
        console.log("Oups nothing found")
        return
    } 

    response.transactions.map((result) => `https://eosq.app/tx/${result.lifecycle.id}`)
} catch (error) {
    console.log("An error occurred", error)
}

// Click "▶ run" to try this code right here and see `dfuse` in action right now.

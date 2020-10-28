async function getZkSyncProvider (zksync, networkName) {
    let zkSyncProvider
    try {
        zkSyncProvider = await zksync.getDefaultProvider(networkName)
    } catch (error) {
        console.log('Unable to connect to zkSync.')
        console.log(error)
    }
    return zkSyncProvider
} //end async function getZkSyncProvider()

async function initAccount (rinkebyWallet, zkSyncProvider, zksync) {
    
} //end async function initAccount()
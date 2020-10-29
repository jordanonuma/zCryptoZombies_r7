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

async function getEthereumProvider (ethers, networkName) {
    let ethersProvider
    try {
      // eslint-disable-next-line new-cap
      ethersProvider = new ethers.getDefaultProvider(networkName)
    } catch (error) {
      console.log('Could not connect to Ethereum')
      console.log(error)
    }
    return ethersProvider
  } //end async function getEthereumProvider()

async function initAccount (rinkebyWallet, zkSyncProvider, zksync) {
    const zkSyncWallet = await zksync.Wallet.fromEthSigner(rinkebyWallet, zkSyncProvider)
    return zkSyncWallet
} //end async function initAccount()

async function registerAccount (wallet) {
    console.log(`Registering the ${wallet.address()} account on zkSync`)
    
    if (!await wallet.isSigningKeySet()) {
        // Your signing keys have not been set. You'll place the logic for setting it here.
        if (await wallet.getAccountId() === undefined) {
            throw new Error('Unknown account')
        } //end if()
    } //end if()

} //end async function registerAccount()
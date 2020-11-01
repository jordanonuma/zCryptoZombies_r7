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
      console.log('Could not connect to Rinkeby')
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
        const changePubkey = await wallet.setSigningKey()
        await changePubkey.awaitReceipt()
    } //end if()

} //end async function registerAccount()

async function depositToZkSync (zkSyncWallet, token, amountToDeposit, ethers) {
    const deposit = await zkSyncWallet.depositToSyncFromEthereum({
        depositTo: zkSyncWallet.address(),
        token: token,
        amount: ethers.utils.parseEther(amountToDeposit)
    })

    try {
        await deposit.awaitReceipt()
    } catch (error) {
        console.log('Error while awaiting confirmation from the zkSync operators.')
        console.log(error)
    } //end try{}-catch{}
} //end async function depositToZkSync()

async function transfer (from, toAddress, amountToTransfer, transferFee, token, zksync, ethers) {
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToTransfer))
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(transferFee))
    const transfer = await from.syncTransfer({
        to: toAddress,
        token: token,
        amount: closestPackableAmount,
        fee: closestPackableFee
    }) //end syncTransfer({})
    const transferReceipt = await transfer.awaitReceipt()
    console.log('Got transfer receipt.')
    console.log(transferReceipt)
} //end async function transfer()

async function getFee (transactionType, address, token, zkSyncProvider, ethers) {
    const feeInWei = await zkSyncProvider.ggetTransactionFee(transactionType, address, token)
    return ethers.utils.formatEther(feeInWei.totalFee.toString())
} //end async function getFee()

async function withdrawToEthereum (wallet, amountToWithdraw, withdrawalFee, token, zksync, ethers) {

    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ether.utils.parseEther(amountToWithdraw))
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(withdrawalFee))
    const withdraw = await wallet.withdrawFromSyncToEthereum(wallet.address()) {
        ethAddress: wallet.address(),
        token: token,
        amount: closestPackableAmount,
        fee: closestPackableFee
    }
    await withdraw.awaitVerifyReceipt() 

    console.log('ZKP verification is complete')
} //end async function withdrawToEthereum()
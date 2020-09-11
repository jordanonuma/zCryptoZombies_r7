const CryptoZombies = artifacts.require("CryptoZombies");

contract("CryptoZombies", (accounts) => {
    let [alice, bob] = accounts;
    it("should be able to create a new zombie", async () => {
        const contractInstance = await CryptoZombies.new();
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
    }) //end it()
}) //end contract("", ()=>{})
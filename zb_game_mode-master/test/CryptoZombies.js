const CryptoZombies = artifacts.require("CryptoZombies");

contract("CryptoZombies", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await CryptoZombies.new();
    }); //end beforeEach()

    it("should be able to create a new zombie", async () => {
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.name, zombieNames[0]);
    }) //end it()

    it("should not allow two zombies", async () => {
        await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}));
    }) //end it()

    xcontext("with the single-step transfer scenario", async() => {
        it("should transfer a  zombie", async() => {
            await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = await contractInstance.createRandomZombie(zombieNames[0]);
        }) //end it()
    }) //end context()

    xcontext("with the two-step transfer scenario", async() => {
        it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {

        }) //end it()
        it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
            
        }) //end it()
    }) //end context()
}) //end contract("", ()=>{})
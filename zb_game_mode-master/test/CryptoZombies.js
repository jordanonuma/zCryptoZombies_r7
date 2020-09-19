const CryptoZombies = artifacts.require("CryptoZombies");
const utils = require("./helpers/utils");
const time = require("./helpers/time");
const zombieNames = ["Zombie 1", "Zombie 2"];
var expect = require('chai').expect;

contract("CryptoZombies", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await CryptoZombies.new();
    }); //end beforeEach()

    it("should be able to create a new zombie", async () => {
        const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        expect(result.receipt.status).to.equal(true); //replaces assert.equal(result.receipt.status, true);
        expect(result.logs[0].args.name).to.equal(true); //replaces assert.equal(result.logs[0].args.name, zombieNames[0]);
    }) //end it()

    it("should not allow two zombies", async () => {
        await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], {from: alice}));
    }) //end it()

    context("with the single-step transfer scenario", async() => {
        it("should transfer a  zombie", async() => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob); //replaces assert.equal(newOwner, bob);
        }) //end it()
    }) //end context()

    context("with the two-step transfer scenario", async() => {
        it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.approve(bob, zombieId, {from: alice});
            await contractInstance.transferFrom(alice, bob, zombieId, {from: bob});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob); //replaces assert.equal(newOwner,bob);
        }) //end it()
        it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
            const zombieId = result.logs[0].args.zombieId.toNumber();
            await contractInstance.approve(bob, zombieId, {from: alice});
            await contractInstance.transferFrom(alice, bob, zombieId, {from: alice});
            const newOwner = await contractInstance.ownerOf(zombieId);
            expect(newOwner).to.equal(bob); //replaces assert.equal(newOwner, bob);
        }) //end it()
    }) //end context()

    it("zombies should be able to attack another zombie", async () => {
        let result;
        result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        const firstZombieId = result.logs[0].args.zombieId.toNumber();
        result = await contractInstance.createRandomZombie(zombieNames[1], {from: bob});
        const secondZombieId = result.logs[0].args.zombieId.toNumber();
        
        await time.increase(time.duration.days(1)); //simulates a day has passed so we don't actually have to wait 24 hours to test second section
        await contractInstance.attack(firstZombieId, secondZombieId, {from: alice});
        expect(result.receipt.status).to.equal(true); //replaces assert.equal(result.receipt.status, true);
    }) //end it()

}) //end contract("", ()=>{})
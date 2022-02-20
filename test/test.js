const { expect } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { ethers } = require("hardhat");

describe("BlockNotes", function() {
    
    let blockNotes;

    beforeEach(async function () {
        const BlockNotes = await ethers.getContractFactory("BlockNotes");
        blockNotes = await BlockNotes.deploy();
        await blockNotes.deployed();
    });

    describe("View", async function () {
        it("Should let us view our task", async() => {
            await blockNotes.create(1, "Learn Solidity");
            expect(await blockNotes.isValue(1)).to.be.true;
        })
        it("Should not return 'true' if there's no task", async() => {
            await blockNotes.create(1, "Learn Solidity");
            expect(await blockNotes.isValue(2)).to.be.false;
        })
    });
    describe("Create", async() => {
        it("Should let us create new tasks", async() => {
            await blockNotes.create(1, "Learn Solidity");
            expect(await blockNotes.isValue(1)).to.be.true;
        })
        it("Should not let us create a new task if we use the same ID", async() => {
            await blockNotes.create(1, "Learn Rust");
            await expect(blockNotes.create(1, "Learn Solidity")).to.be.revertedWith('Another task was declared with this ID already.');
        })
        
    });
    describe("Update", async() => {
        it("Should let us update tasks' name", async() => {
            await blockNotes.create(1, "Learn Rust");
            await blockNotes.updateName(1, "Learn Solidity")

            expect(await blockNotes.getName(1)).to.equal("Learn Solidity");
        })
        it("Should let us update tasks' state", async() => {
            await blockNotes.create(1, "Learn Solidity");
            await blockNotes.updateState(1);

            expect(await blockNotes.getState(1)).to.be.true;
        })
    });
})

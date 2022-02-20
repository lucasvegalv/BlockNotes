const hre = require("hardhat");

async function main() {
  const BlockNotes = await hre.ethers.getContractFactory('BlockNotes');
  const blockNotes = await BlockNotes.deploy();
  await blockNotes.deployed()

  console.log('BlockNotes deployed to address: ' + blockNotes.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

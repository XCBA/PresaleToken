// This is a script for deploying your contracts. You can adapt it to deploy

// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  const PresaleToken = await ethers.getContractFactory("PresaleToken");
  const presaleToken = await PresaleToken.deploy(token.address);
  await presaleToken.deployed();

  console.log("PresaleToken address:", presaleToken.address);

  const APPROVE_AMOUNT = '20000';

  await token.connect(deployer).approve(presaleToken.address, APPROVE_AMOUNT);

  console.log(`Approved ${APPROVE_AMOUNT} tokens to PresaleToken Address.`);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token, presaleToken);
}

function saveFrontendFiles(token, presaleToken) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ 
      Token: token.address, 
      PresaleToken : presaleToken.address,
      USDC : "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b"
    }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );

  const PresaleTokenArtifact = artifacts.readArtifactSync("PresaleToken");
 
  fs.writeFileSync(
    contractsDir + "/PresaleToken.json",
    JSON.stringify(PresaleTokenArtifact, null, 2)
  );

  console.log('Saving to frontend success.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

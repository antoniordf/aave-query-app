require("dotenv").config();
const { execSync } = require("child_process");

const infuraProjectId = process.env.PROJECT_ID;
const privateKey = process.env.PRIVATE_KEY;

if (!infuraProjectId || !privateKey) {
  console.error("Please set PROJECT_ID and PRIVATE_KEY in your .env file.");
  process.exit(1);
}

// Construct the forge command with the appropriate RPC URL and private key
const command = `forge script script/DeployAaveDataQuery.sol --broadcast --rpc-url https://sepolia.infura.io/v3/${infuraProjectId} --private-key ${privateKey}`;
execSync(command, { stdio: "inherit" });

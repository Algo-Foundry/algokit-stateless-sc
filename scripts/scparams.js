const sha256 = require("js-sha256");
const algosdk = require("algosdk");
require("dotenv").config();

const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN,
  process.env.ALGOD_SERVER,
  process.env.ALGOD_PORT
);

(async () => {
  // converts the secret to sha256 hash and encodes it to base64 format
  const secret = "secret random set of words here";
  const secretHash = Buffer.from(sha256.digest(secret)).toString("base64");

  // get current block round
  const status = await algodClient.status().do();
  const timeout = status["last-round"] + 5;

  console.log("Add these values to your smart contract");
  console.log(`TIMEOUT = ${timeout}`);
  console.log(`ACC1_ADDR = "${process.env.ACC1_ADDR}"`);
  console.log(`ACC2_ADDR = "${process.env.ACC2_ADDR}"`);
  console.log(`HASH = "${secretHash}"`);
})();

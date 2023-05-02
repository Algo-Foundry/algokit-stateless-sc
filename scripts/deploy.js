const algosdk = require("algosdk");
const { generateLogicSignature, fundAccount } = require("./helpers/algorand");
require("dotenv").config();

(async () => {
  const creator = algosdk.mnemonicToSecretKey(process.env.CREATOR_MNEMONIC);

  // Update htlc.py with the required variables before compiling the contract
  const lsig = await generateLogicSignature("htlc.teal");

  // Create contract account
  await fundAccount(creator, lsig.address(), 10e6);

  console.log("Contract Account Address:", lsig.address());
})();

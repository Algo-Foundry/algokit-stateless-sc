const algosdk = require("algosdk");
const {
  generateLogicSignature,
  paymentViaLsig,
} = require("./helpers/algorand");
require("dotenv").config();

const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN,
  process.env.ALGOD_SERVER,
  process.env.ALGOD_PORT
);

(async () => {
  const acc1Addr = process.env.ACC1_ADDR;

  // compile lsig
  const lsig = await generateLogicSignature("htlc.teal");

  // get current block round
  const status = await algodClient.status().do();
  console.log("Current block round:", status["last-round"]);

  // recover 1 Algos from contract account
  const { confirmation } = await paymentViaLsig(lsig, acc1Addr, 1e6);
  console.log(confirmation);
})();

const {
  generateLogicSignature,
  paymentViaLsig,
} = require("./helpers/algorand");
require("dotenv").config();

(async () => {
  const acc2Addr = process.env.ACC2_ADDR;

  // compile lsig with args
  const args = [new Uint8Array(Buffer.from("secret random set of words here"))];
  const lsig = await generateLogicSignature("htlc.teal", args);

  // withdraw 1 Algos from contract account
  const { confirmation } = await paymentViaLsig(lsig, acc2Addr, 1e6);
  console.log(confirmation);
})();

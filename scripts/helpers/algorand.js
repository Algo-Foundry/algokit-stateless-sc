const algosdk = require("algosdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN,
  process.env.ALGOD_SERVER,
  process.env.ALGOD_PORT
);

const submitToNetwork = async (signedTxns) => {
  // send txn
  const response = await algodClient.sendRawTransaction(signedTxns).do();

  // Wait for transaction to be confirmed
  const confirmation = await algosdk.waitForConfirmation(
    algodClient,
    response.txId,
    4
  );

  return {
    response,
    confirmation,
  };
};

const generateLogicSignature = async (filename, args) => {
  // Compile to TEAL
  const filePath = path.join(__dirname, `../../artifacts/${filename}`);
  const data = fs.readFileSync(filePath);
  const compiledProgram = await algodClient.compile(data).do();

  // Create logic signature for sender account
  const programBytes = new Uint8Array(
    Buffer.from(compiledProgram.result, "base64")
  );

  const lsig = new algosdk.LogicSigAccount(programBytes, args);

  return lsig;
};

const paymentTxn = async (from, to, amount) => {
  let suggestedParams = await algodClient.getTransactionParams().do();

  return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from,
    to,
    amount,
    suggestedParams,
  });
};

const fundAccount = async (fromAccount, to, amount) => {
  const txn = await paymentTxn(fromAccount.addr, to, amount);
  const signedTxn = txn.signTxn(fromAccount.sk);

  return await submitToNetwork(signedTxn);
};

const paymentViaLsig = async (lsig, to, amount) => {
  let suggestedParams = await algodClient.getTransactionParams().do();

  const txn = await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    from: lsig.address(),
    to,
    amount,
  });

  const signedTxn = algosdk.signLogicSigTransactionObject(txn, lsig);

  return await submitToNetwork(signedTxn.blob);
};

module.exports = {
  submitToNetwork,
  generateLogicSignature,
  fundAccount,
  paymentViaLsig,
};

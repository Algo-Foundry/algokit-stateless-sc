# Stateless Smart Contract Assignment

In this assignment, you will be tasked to write a [hashed time lock contract (htlc)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts). You will also need to test this contract by sending transactions to withdraw funds from it.

Essentially, this is a stateless smart contract that only allows accounts to withdraw funds from it if a secret is supplied. This secret is usually given by the creator. The contract creator can also recover the funds from this contract after a certain period of time.

### Deliverables
Complete the code in `assets/htlc.py` so that this stateless smart contract performs basic checks for all transactions and does either fund withdrawal check or fund recovery check.

#### Basic checks
1. `rekey to` and `close remainder to` addresses are not found in the transaction.
2. Transaction is a payment type transaction.

#### Fund withdrawal checks
1. Receiver is `acc2` address.
2. Correct secret supplied. This secret is a base64 encoded sha256 hash of this set of words `secret random set of words here`.

#### Fund recovery check
1. Receiver is `acc1` address.
2. Current block round is past the `timeout` value supplied. For simplicity sake, assume `timeout` value is `50` rounds ahead of the block round when the contract account is first created.

## Setup instructions

### Install python packages via AlgoKit
run `algokit bootstrap poetry` within this folder

### Install JS packages
run `yarn install`

### Update environement variables
1. Copy `.env.example` to `.env`
2. Update Algorand Sandbox credentials in `.env` file
3. Update accounts in `.env` file

### Initialize virtual environment
run `poetry shell`

### Compile contracts
run `python htlc.py`

### Withdraw Funds
run `node scripts/withdraw.js`

### Recover Funds
run `node scripts/recover.js`
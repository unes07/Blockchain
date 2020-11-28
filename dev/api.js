const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const { v1: uuidv1} = require("uuid");
const app = express();

// Creating a unique id of the fake miner
const nodeAddress = uuidv1().split("-").join("");

// Creating an insatance
const bitcoin = new Blockchain();

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get the blockchain
app.get("/blockchain", (req, res) => {
  res.send(bitcoin);
});

// Post a transaction to pending Transactions
app.post("/transaction", (req, res) => {
  // Get data from body
  const amount = req.body.amount;
  const sender = req.body.sender;
  const recipient = req.body.recipient;

  // Save the block indec where the transaction being saved
  const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);

  // Response
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// mine a block
app.get("/mine", (req, res) => {
  // Get last block & hash it
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock["hash"];

  // Get current block of data
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1,
  };

  // Get the corret nonce (the mining)
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

  // Create a new hash for the new block
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  // Reward of the miner (fake miner)
  bitcoin.createNewTransaction(12.5, "00", nodeAddress);

  // Create a new block
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  // Response
  res.json({
    note: "New block mined successfully",
    block: newBlock,
  });
});

// Server listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server listening on port 3000...");
});

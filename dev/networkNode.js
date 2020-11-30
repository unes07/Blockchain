const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const { v1: uuidv1 } = require("uuid");
// const urllib = require('urllib');
const rp = require('request-promise');
const PORT = process.argv[2];
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

// Creating a network
// Register a node & broadcast it the network
app.post("/register-and-broadcast-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;

  // Push the new Node Url to the network of nodes
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
    bitcoin.networkNodes.push(newNodeUrl);
  }

  // Broadcast: register the network in the new node
  const regNodesPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    // POST '/register-node'
    const requestOptions = {
      uri: networkNodeUrl + "/register-node",
      method: "POST",
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };

    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
      };

      return rp(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: "New node registred with network successfully." });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Register a node with the network
app.post("/register-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  res.json({ note: "New node registred successfully." });
});

// Register multiple node at once
app.post("/register-nodes-bulk", function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach((networkNodeUrl) => {
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(networkNodeUrl);
    }
  });
  res.json({ note: "Bulk registration successful." });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

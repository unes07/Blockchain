const sha256 = require("sha256");
const currentNodeUrl = process.argv[3];

// Blockchain cONSTRACTOR
function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  // Current Node Url
  this.currentNodeUrl = currentNodeUrl;

  // Others Nodes Urls
  this.networkNodes = [];

  //Creating A Genesis Block : First Block
  this.createNewBlock(100, "0", "0");
}

// Create New Block
Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

// Get Last Block
Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

// Create New Transaction
Blockchain.prototype.createNewTransaction = function (
  amount,
  sender,
  recipient
) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
  };
  this.pendingTransactions.push(newTransaction);

  return this.getLastBlock()["index"] + 1;
};

// Hashing the Block
Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

// Proof of work
Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== "0000") {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }

  return nonce;
};

module.exports = Blockchain;

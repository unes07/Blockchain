# Blockchain
As part of the Financial Engineering capstone project, I built a basic blockchain and illustrate its impact on the financial sector. I tried to clone the basic technology behind Bitcoin: the nodes network, Byzantine Fault Tolerance (BFT), Consensus.

Technology is playing a major role in advancing the financial sector. Rather than a black box, blockchain and other technologies must be understood in order to recognize how it works and how it affects our Decision-Making process.

You can find the project report in french: [Blockchain the new era of Finance](https://drive.google.com/file/d/1slgewgIG6wg11t-Z5ido-PAhqN4tyd0h/view?usp=sharing)

# Installation & Prerequisites
Make sure you have [Node.js](https://nodejs.org/) & [Postman](https://www.postman.com/downloads/) installed in your computer to follow the guide.
Then download the files, extract the files at a directory **blockchain**, and install the dependencies.
```sh
$ git clone https://github.com/unes07/Blockchain.git
$ cd blockchain
$ npm install
```
# Guide

## Setup Nodes
If you take a look at the package.json file you will find the node configurations at the **scripts**. There's 5 nodes you can add other ones or delete some.

![package.json Scripts](/images/package.jsonScripts.png)

To run a node, run the command below at the terminal. At each terminal run a node. for the five nodes
`<addr>`x: number of the node, like run node_1
```sh
$ npm run node_x
```

You can visit at your browser for seeing node 1 [http://localhost:3001/blockchain](http://localhost:3001/blockchain), and change the *1* by the numbers of the nodes [2:5].

![blockchain api](/images/image1.jpg)

## Network
The blockchain network will make the nodes connected & will share data together.
To create the network:
 1. Open Postman
 2. Change to POST request
 3. Click on body
 4. Then **raw**
 5. Make sure is **JSON**
 6. Enter the following JSON script:
 ```
  {
      "newNodeUrl": "http://localhost:3002"
  }
 ```
 7. Then make a POST request to 
  > http://localhost:3001/register-and-broadcast-node
  
![request](/images/image2.jpg)
  
-By making this request the second node and the first one are now connected you can check your browser to verfiy the Node Url of the seconde node is added at the *networkNodes* array of the first node.

![blockchain node 1](/images/image3.jpg)

Now you can added the other nodes to the network by yourself, following the same steps changing just the body of the request: change the Node Url (number).

-**Note:** we make a request to the first node but you can make it to any of the running nodes.

Now you network is ready we can start making some transactions.

![blockchain node 1 network](/images/image4.jpg)

## Transactions
To make a transaction:
 1. Open Postman
 2. Change to POST request
 3. Click on body
 4. Then **raw**
 5. Make sure is **JSON**
 6. Enter the following JSON script:
 ```
  {
	"amount": 14,
	"sender": "JEAKJDBSCSDBQSHBCHQB42",
	"recipient": "FCSDBQSHBCHQB4254JHGH56"
  }
 ```
  * amount: the amount of the transaction
  * sender: the sender public key, for our case is a random Id
  * recipient: the recipient public key, for our case is a random Id
  
 7. Then make a POST request to 
  > http://localhost:3001/transaction/broadcast
  
![Postman: make a transaction](/images/image5.jpg)
 
-**Note:** you can send the request for any of the nodes, the consensus algorithm will broadcast the transaction to all the other nodes at the network.
-You can make as many transactions as you want.

The transaction is in **pendingTransactions**, to add this block of transactions to the chain it should be mined.

![blockchain node 1](/images/image6.jpg)

## Mining
To mine a block you should make a request to **/mine** to any of the running nodes. for example:
> http://localhost:3001/mine

![Mining the block](/images/image7.jpg)

If you check now the blockchain API page http://localhost:3001/mine you will notice another transaction of the amount of 12 is being added to the **pendingTransactions** sent by "00" to a random Id. This is the reward of the miner sent by the blockchain to the miner wallet (public key).

![blockchain node 1](/images/image8.jpg)

## Consensus
In our guide, we added all the nodes to the network before adding any of the data to the blockchain, but if a node joins later the network will not have the previous data. for that he should send a request to **/consensus** to get the right data:
> http://localhost:3001/consensus

![consensus node 1](/images/image9.jpg)

## Block Explorer
If you visited http://localhost:3001/block-explorer you will find an explorer of your blockchain.
you can search by:
 * a Block Hash
 * a Transaction Id
 * an Address¹
Address¹: is the wallet Id of a sender or a recipient
You can find your data at your API, the enter it at the first input, then choose from the dropdown the type of the search. An example of a searsh by **Block Hash**

![Block Explorer](/images/image10.jpg)




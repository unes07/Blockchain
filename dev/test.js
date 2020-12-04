const Blockchain = require("./blockchain");
const bitcoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1607108780043,
      transactions: [],
      nonce: 100,
      hash: "0",
      previousBlockHash: "0",
    },
    {
      index: 2,
      timestamp: 1607108957254,
      transactions: [],
      nonce: 18140,
      hash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
      previousBlockHash: "0",
    },
    {
      index: 3,
      timestamp: 1607108963745,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "34b52b90366411eba0c5df298de05f52",
        },
      ],
      nonce: 77743,
      hash: "00000375cd3ea6734eb3d90c7fc232e1a792fdecbc7f6b97f6cc85dd68c34b13",
      previousBlockHash:
        "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    },
    {
      index: 4,
      timestamp: 1607108967374,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "3880b280366411eba0c5df298de05f52",
        },
      ],
      nonce: 51272,
      hash: "0000b0e02601bc88bb085d852a3901fd6f45563e77961c1ac3503b84aa2ea781",
      previousBlockHash:
        "00000375cd3ea6734eb3d90c7fc232e1a792fdecbc7f6b97f6cc85dd68c34b13",
    },
    {
      index: 5,
      timestamp: 1607109023482,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "3aaa7050366411eba0c5df298de05f52",
        },
        {
          amount: 300,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "4a647860366411eba0c5df298de05f52",
        },
        {
          amount: 10,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "4f1a8660366411eba0c5df298de05f52",
        },
        {
          amount: 7,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "53ac1c70366411eba0c5df298de05f52",
        },
      ],
      nonce: 63918,
      hash: "00004b2fe35464787edfaadc68418b5d27b7a7d112e7540f1e41c134d649617d",
      previousBlockHash:
        "0000b0e02601bc88bb085d852a3901fd6f45563e77961c1ac3503b84aa2ea781",
    },
    {
      index: 6,
      timestamp: 1607109074540,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "5c1c4c40366411eba0c5df298de05f52",
        },
        {
          amount: 725,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "6e651580366411eba0c5df298de05f52",
        },
        {
          amount: 5,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "71312dd0366411eba0c5df298de05f52",
        },
        {
          amount: 8785,
          sender: "ASHJZFBDCK38V4DVV65D4V",
          recipient: "ASHGHVHG8666V4DVV65D4V",
          transactionId: "7521c8f0366411eba0c5df298de05f52",
        },
      ],
      nonce: 52527,
      hash: "00009f2eef52ccd0becaf3c689ab95a46271490960e606379a09b33486c3a661",
      previousBlockHash:
        "00004b2fe35464787edfaadc68418b5d27b7a7d112e7540f1e41c134d649617d",
    },
    {
      index: 7,
      timestamp: 1607109086619,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "7a8afa50366411eba0c5df298de05f52",
        },
      ],
      nonce: 14235,
      hash: "00005970c0043d66d9f96491302a0a187813150bafc701da1ee7923614781d69",
      previousBlockHash:
        "00009f2eef52ccd0becaf3c689ab95a46271490960e606379a09b33486c3a661",
    },
    {
      index: 8,
      timestamp: 1607109095573,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "cb007880366311eba0c5df298de05f52",
          transactionId: "81bdc820366411eba0c5df298de05f52",
        },
      ],
      nonce: 215414,
      hash: "0000bd5147979e89a497fc45abb71166c820da4d33702329d91687ae3857f82f",
      previousBlockHash:
        "00005970c0043d66d9f96491302a0a187813150bafc701da1ee7923614781d69",
    },
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00",
      recipient: "cb007880366311eba0c5df298de05f52",
      transactionId: "8714f820366411eba0c5df298de05f52",
    },
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: [],
};

console.log("VALID: ", bitcoin.chainIsValid(bc1.chain));

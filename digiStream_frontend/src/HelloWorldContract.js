// HelloWorldContract.js
const contractAbi = [
    // Paste the ABI of the deployed contract here
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_data",
                    "type": "string"
                }
            ],
            "name": "setData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
  ];
  
  const contractAddress = "0xd2BBb0650eaeCE5b60f9D38253f076EEDC4270Eb"; // Paste the deployed contract address here
  
  export { contractAbi, contractAddress };
  
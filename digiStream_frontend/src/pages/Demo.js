import React, { useState, useEffect } from "react";
import Web3 from "web3";

const ContractAddress = "0x8ff808C9c1A713f0cFe74a243846783124FC4882";
const ContractABI = [
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "finalValue",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get",
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

const Demo = () => {
  const [contractData, setContractData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          // Modern DApp browsers (MetaMask)
          console.log("MetaMask detected.");
          const web3 = new Web3(window.ethereum);

          await window.ethereum.enable(); // Request user's permission to connect their wallet

          const contract = new web3.eth.Contract(ContractABI, ContractAddress);

          // Call the "get" function of the contract to fetch data
          const data = await contract.methods.get().call();
          console.log("Contract Data:", data);

          setContractData(data);
          setLoading(false);
        } else {
          console.error("Please install MetaMask to use this app.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Contract Data:</h1>
          <p>{contractData}</p>
        </div>
      )}
    </div>
  );
};

export default Demo;

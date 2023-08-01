import React, { useState } from 'react';
import './PricingPage.css';
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PricingPage = () => {
  
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const navigate = useNavigate();

  const startPayment = async ({ setError, setTxs, ether, addr }) => {
  
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
    // Request the user to connect their wallet and grant access to your application
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    // Get the first connected account (wallet address)
    const user = accounts[0];
    console.log(user,"self")
     // await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      const response = await axios.put(`http://localhost:3000/api/update-subscriber/${user}`,{
        subscriber: true,
      });
     // setMessage(response.data.message);
     console.log(response)
     alert(response.data.message)
     navigate('/')
      setTxs([tx]);
    } catch (err) {
      setError(err.message);
      alert(err.message)
    }
  };

  const handleSubmit =  async(item) => {
    console.log(item.price)
    //e.preventDefault();
    //const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether:item.price,
      addr: "0x2B25F073786DcDad51f47e4c9784Aded41E24D6D"
    });
  };

 
  // Sample pricing data (you can replace this with your actual data)
  const pricingData = [
    {
      plan: 'Basic',
      price: '0.01',
      features: ['Access to Basic movies and TV shows', 'Standard streaming quality'],
    },
    {
      plan: 'Standard',
      price: '0.02',
      features: [
        'Access to Basic and Standard movies and TV shows',
        'High-definition (HD) streaming quality',
      ],
    },
    {
      plan: 'Premium',
      price: '0.03',
      features: [
        'Access to Basic, Standard, and Premium movies and TV shows',
        'Ultra-high-definition (UHD/4K) streaming quality',
        'Ability to stream on multiple devices',
        'Offline downloads',
      ],
    },
  ];

  return (
    <div className='dp'>
 <div className="pricing-container">
      
      {pricingData.map((tier, index) => (
        <div className="pricing-tier" key={index}>
          <h2>{tier.plan}</h2>
          <p className="price">{tier.price} ETH</p>
          <ul>
            {tier.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul> 
          <button  onClick={()=>handleSubmit(tier)}>Choose Plan</button>
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default PricingPage;

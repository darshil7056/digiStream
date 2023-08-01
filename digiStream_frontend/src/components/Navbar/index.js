import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/D (1).png';
import { BiSearch } from 'react-icons/bi';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import Web3 from 'web3';
import { useWallet } from '../../WalletContext';

function NavBar(props) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const { walletAddress, setWalletAddress } = useWallet();

  

  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const address = accounts[0];
        setAddress(address);
        setConnected(true);
        setWalletAddress(address); // Update the wallet address using the context
        fetchBalance(address);
      } else {
        alert('MetaMask not found. Please install MetaMask to connect.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const disconnectFromMetaMask = async() => {

    setAddress('');
    setBalance('');
    setConnected(false);
    setWalletAddress(''); // Reset the wallet address to an empty string
  };

  const fetchBalance = async (address) => {
    try {
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      const formattedBalance = web3.utils.fromWei(balance, 'ether');
   
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <>
      <div className='navheader'>
        <Link id='logo'>
          <div className='cssFont_1' style={{ fontFamily: 'Montserrat, sans-serif' }}>
            DIGISTREAM
          </div>
        </Link>
        <div className='head'>
          <ul>
            <li>
              <Link to='/' className='navlink'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/tvshows' className='navlink'>
                Tv Shows
              </Link>
            </li>
            <li>
              <Link to='/genres' className='navlink'>
                Genres
              </Link>
            </li>
            <li>
              <Link to='/newseries' className='navlink'>
                New & Popular
              </Link>
            </li>
            <li>
              <Link to='/newseries' className='navlink'>
                My List
              </Link>
            </li>
          </ul>
        </div>

        <div class='searchBox'>
          <input class='searchInput' type='text' name='' placeholder='Search' />
          <BsSearch class='material-icons' color={'black'} />
        </div>

        <div class='login'>
          {connected ? (
            <>
              <div className='balance'>
                <p>Address: {address}</p>
                <p>Balance: {balance} ETH</p>
              </div>
              <Button className='navlink' onClick={disconnectFromMetaMask}>
                Disconnect Wallet
              </Button>
            </>
          ) : (
            <Button className='navlink ' onClick={connectToMetaMask}>
              Connect Wallet
            </Button>
          )}
        </div>
        <div class='login'>
          <Link to='/fiat' className='navlink'>
            Buy Crypto
          </Link>
        </div>
        <div class='login'>
          <Link to='/login' className='navlink'>
            Login
          </Link>
        </div>
        <div class='login'>
          <Link to='/register' className='navlink'>
            Register
          </Link>
        </div>
        
      </div>
    </>
  );
}

export default NavBar;

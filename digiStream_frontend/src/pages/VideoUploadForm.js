import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

    try {
      const added = await ipfs.add(image);

      // Pin the CID to ensure content availability
      const cid = added.cid.toString();
      await ipfs.pin.add(cid);

      setIpfsHash(cid);
      const baseURL = 'http://localhost:5001/ipfs/';
const imageURL = baseURL + ipfsHash;
console.log(imageURL);

      
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload to IPFS</button>
      </form>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </div>
  );
};

export default UploadImage;

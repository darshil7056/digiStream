import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import TvShows from './pages/tvshows';
import Login from './pages/login/login';
import Trailer from './pages/trailer';
import Layout from './routes/Layout';
import "bootstrap/dist/css/bootstrap.min.css"
import Fiat from './pages/Fiat';
import Register from './pages/registration/registration';
import VideoUploadForm from './pages/VideoUploadForm';
import { WalletProvider } from './WalletContext';
import PricingPage from './pages/pricing/PricingPage';
import Demo from './pages/Demo';
import Genres from './pages/genres';
// import Moralis from "moralis/dist/moralis.min.js";

function App() {
  // const serverUrl ="https://nrbbwcbnp5gu.grandmoralis.com:2053/server";
  // const appId ="ZvfYAjzru3QbHAEzhf2UydWE20TpwgMIBDB7IFfD";
  // Moralis.start({ serverUrl, appId });
  // console.log("Connected");
 
  return (
    <>
      <BrowserRouter>
      <WalletProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tvshows' element={<TvShows />} />
            <Route path='/genres' element={<Genres />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/trailer/:id' element={<Trailer />} />
            <Route path='/fiat' element={<Fiat/>} />
            <Route path='/upload' element={<VideoUploadForm />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/demo' element={<Demo />} />
          </Routes>
        </Layout>
       
        </WalletProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

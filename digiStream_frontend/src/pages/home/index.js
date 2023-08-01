import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  AiFillLike,
  AiFillPlayCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { MdOutlineExpandCircleDown } from 'react-icons/md';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import getMovie from '../../api/getMovies';
import HomeSlider from '../../components/Homeslider';
import BasicModal from '../../components/BasicModal';
import { useWallet } from '../../WalletContext';
import axios from 'axios';

export const imageURL = 'https://image.tmdb.org/t/p/w500/';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 16,
  },
  superLargeDesktop1: {
    breakpoint: { max: 3000, min: 2000 },
    items: 12,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1500 },
    items: 8,
  },
  desktop2: {
    breakpoint: { max: 1500, min: 1000 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1000, min: 400 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
  },
};

function Home() {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [newMovie, setNewMovie] = useState([]);
  const [hoveredData, setHoveredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubscriber, setIsSubscriber] = useState(null);

  const navigate = useNavigate();
  //const { walletAddress } = useWallet();
  //console.log(walletAddress,"asdasndasigai")
  const walletAddress = "0xd2BBb0650eaeCE5b60f9D38253f076EEDC4270Eb"
  useEffect(() => {
    // Fetch subscriber status from backend API
    axios.get(`http://localhost:3000/api/check-subscriber/${walletAddress}`)
      .then((response) => {
        console.log(response.data)
        const { success, subscriber } = response.data;
        if (success) {
          setIsSubscriber(subscriber);
        } else {
          // Handle error if API call fails
          console.error('Failed to fetch subscriber status');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [walletAddress]);
  console.log(isSubscriber)

  useEffect(() => {
    // Check if the subscriber status is available
    if (isSubscriber === 1) {
      // If subscriber is true, navigate to the Home page
      navigate('/');
    } else if (isSubscriber === 0) {
      // If subscriber is false, navigate to the PricingPage
      navigate('/pricing');
    }
    // If isSubscriber is null (status not fetched yet), do nothing
  }, [isSubscriber, navigate]);

   
  const handleOpenModal = (movieid) => {

    if (walletAddress) { // Wallet is connected, navigate to the trailer page
      navigate(`/trailer/${movieid}`);
    } else { // Wallet is not connected, open the modal
      setIsModalOpen(true);
    }
    console.log(isModalOpen)
  };

  const loadData = async () => {
    setTrendingMovie(await getMovie('movie/popular'));
    setNewMovie(await getMovie('movie/upcoming'));
 
  };

  useEffect(() => {
    loadData();
  }, []);

  const getMovieDetails = async ({ id }) => {
    setHoveredData((await getMovie(`/movie/${id}/videos`)).results[0]);
  };

  const TrailerPlay = () => (
    <>
      <div
        className='descVedio'
        style={{
          background: 'transparent',
          height: '200px',
          zIndex: 99999999,
          bottom: 0,
        }}
      >
        <iframe
          src={
            'https://www.youtube-nocookie.com/embed/' +
            hoveredData?.key +
            '?controls=0'
          }
          width='100%'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen=''
        />

        <div className='frameDisc' style={{ background: 'transparent' }}>
          <div
            className='framIcon'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div style={{ marginLeft: '5px' }}>
              <AiFillPlayCircle />
              <AiOutlinePlusCircle />
              <AiFillLike />
            </div>
            <div style={{ marginRight: '5px' }}>
              <MdOutlineExpandCircleDown />{' '}
            </div>
          </div>
          <div style={{ padding: '2px' }}>
            <span className='matched'>{hoveredData?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
 
  return (
    <div>
      <div style={{ background: 'black' }}>
        <div className='slide' style={{ background: 'black' }}>
          <HomeSlider />
        </div>
        <div>
          <div className='title'>Trending Now</div>
         
          <Carousel responsive={responsive}>
            {trendingMovie?.results ? (
              trendingMovie?.results?.map((movie, index) => {
                return (
                  <>
                    <Tooltip placement='top-start' title={<TrailerPlay />}>
                      <div key={index} onClick={() => handleOpenModal(movie.id)}>
                        <img
                          onMouseOver={() => getMovieDetails(movie)}
                          // onClick={() => navigate(`/trailer/${movie.id}`)}
                          // onClick={() =>setAuth(true)}
                        //  onClick={handleOpenModal()} // Open the modal when the carousel item is clicked
                          src={imageURL + movie.poster_path}
                          alt='movie'
                          width={'250px'}
                          height={'375px'}
                        />
                      </div>
                    </Tooltip>
                   
                  </>
                );
              })
            ) : (
              <div />
            )}
          </Carousel>
          
          <div className='title'>New Release</div>
          <Carousel responsive={responsive}>
            {newMovie?.results ? (
              newMovie?.results?.map((movie, index) => {
                return (
                  <Tooltip placement='top-start' title={<TrailerPlay />}>
                    <div key={index}  onClick={() => handleOpenModal(movie.id)}>
                      <img
                        onMouseOver={() => getMovieDetails(movie)}
                       // onClick={() => navigate(`/trailer/${movie.id}`)}
                        src={imageURL + movie.poster_path}
                        alt='movie'
                        width={'250px'}
                        height={'375px'}
                      />
                    </div>
                  </Tooltip>
                );
              })
            ) : (
              <div />
            )}
          </Carousel>
        </div>
        <BasicModal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default Home;

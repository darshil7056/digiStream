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
import getTvShows from '../../api/getTvShows';

export const imageURL = 'https://image.tmdb.org/t/p/w500/';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  superLargeDesktop1: {
    breakpoint: { max: 3000, min: 2000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1500 },
    items: 4,
  },
  desktop2: {
    breakpoint: { max: 1500, min: 1000 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1000, min: 400 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

function TvShows() {
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [hoveredData, setHoveredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  console.log(walletAddress, "asdasndasigai")

  const handleOpenModal = (movieid) => {

    if (walletAddress) { // Wallet is connected, navigate to the trailer page
      navigate(`/trailer/${movieid}`);
    } else { // Wallet is not connected, open the modal
      setIsModalOpen(true);
    }
    console.log(isModalOpen)
  };

  const loadData = async () => {
    setTrendingTvShows(await getTvShows('tv/popular'));

  };

  useEffect(() => {
    loadData();
  }, []);

  const getMovieDetails = async ({ id }) => {
    setHoveredData((await getMovie(`/tv/${id}/videos`)).results[0]);
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
        {/* <div className='slide' style={{ background: 'black' }}>
          <TvShowSlider />
        </div> */}
        <div style={{color:'white',padding:'20px'}}>
          <div className='title'>Popular Tv Shows</div>

          <Carousel responsive={responsive}>
            {trendingTvShows?.results ? (
              trendingTvShows?.results?.map((movie, index) => {
                console.log("TvShows Data", movie);
                return (
                  <>
                    <Tooltip placement='top-start' title={<TrailerPlay />}>
                      <div style={{padding:'10px'}} key={index} onClick={() => handleOpenModal(movie.id)}>
                        <img
                          onMouseOver={() => getMovieDetails(movie)}
                          // onCalick={() => navigate(`/trailer/${movie.id}`)}
                          // onClick={() =>setAuth(true)}
                          //  onClick={handleOpenModal()} // Open the modal when the carousel item is clicked
                          src={imageURL + movie.poster_path}
                          alt='movie'
                          width={'250px'}
                          height={'375px'}
                        />
                        <h3 style={{marginTop:'10px'}}>{movie.name}</h3>
                        <h5>Overview: {movie.overview}</h5>
                        <p>First Air Date: {movie.first_air_date}</p>
                        <p>Genre IDs: {movie.genre_ids.join(', ')}</p>
                        <p>ID: {movie.id}</p>
                        <p>Origin Country: {movie.origin_country.join(', ')}</p>
                        <p>Original Language: {movie.original_language}</p>
                        <p>Original Name: {movie.original_name}</p>
                        <p>Popularity: {movie.popularity}</p>
                        <p>Vote Average: {movie.vote_average}</p>
                        <p>Vote Count: {movie.vote_count}</p>
                      </div>
                    </Tooltip>
                  </>
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

export default TvShows;

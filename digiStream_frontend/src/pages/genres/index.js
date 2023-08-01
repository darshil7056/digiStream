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
import getMovieGenere from '../../api/getMovieGenere';
import getTvGenere from '../../api/getTvGenere';

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

function Genres() {
  const [movieGenre, setMovieGenre] = useState([]);
  const [tvGenre, settvGenre] = useState([]);
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
    setMovieGenre(await getMovieGenere('genre/movie/list'));
    settvGenre(await getTvGenere('genre/tv/list'));

  };

  useEffect(() => {
    loadData();
  }, []);

  // const getMovieDetails = async ({ id }) => {
  //   setHoveredData((await getMovie(`/movie/${id}/videos`)).results[0]);
  // };

  // const TrailerPlay = () => (
  //   <>
  //     <div
  //       className='descVedio'
  //       style={{
  //         background: 'transparent',
  //         height: '200px',
  //         zIndex: 99999999,
  //         bottom: 0,
  //       }}
  //     >
  //       <iframe
  //         src={
  //           'https://www.youtube-nocookie.com/embed/' +
  //           hoveredData?.key +
  //           '?controls=0'
  //         }
  //         width='100%'
  //         title='YouTube video player'
  //         frameborder='0'
  //         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  //         allowfullscreen=''
  //       />

  //       <div className='frameDisc' style={{ background: 'transparent' }}>
  //         <div
  //           className='framIcon'
  //           style={{ display: 'flex', justifyContent: 'space-between' }}
  //         >
  //           <div style={{ marginLeft: '5px' }}>
  //             <AiFillPlayCircle />
  //             <AiOutlinePlusCircle />
  //             <AiFillLike />
  //           </div>
  //           <div style={{ marginRight: '5px' }}>
  //             <MdOutlineExpandCircleDown />{' '}
  //           </div>
  //         </div>
  //         <div style={{ padding: '2px' }}>
  //           <span className='matched'>{hoveredData?.name}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div>
      <div style={{ background: 'black', color:'white' }}>
        <div>
          <div className='title'>Movie Genres</div>

          <Carousel responsive={responsive}>
            {movieGenre.map((movie) => {
              console.log("Movie Generes", movie);
              return (
                <>
                  {/* <Tooltip placement='top-start' title={<TrailerPlay />}> */}
                  <div key={movie.id}>
                    <h2>{movie.name}</h2>
                  </div>
                  {/* </Tooltip> */}

                </>
              );
            })
            }
          </Carousel>
        </div>
        <div>
          <div className='title'>Tv Genres</div>

          <Carousel responsive={responsive}>
            {tvGenre.map((movie) => {
              console.log("Tv Generes", movie);
              return (
                <>
                  {/* <Tooltip placement='top-start' title={<TrailerPlay />}> */}
                  <div key={movie.id}>
                    <h2>{movie.name}</h2>
                  </div>
                  {/* </Tooltip> */}

                </>
              );
            })
            }
          </Carousel>
        </div>
        <BasicModal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default Genres;

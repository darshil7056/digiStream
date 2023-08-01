import { Container } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getMovie from '../../api/getMovies';
import { imageURL } from '../home';

function Trailer() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [rMovies, setRMovies] = useState([]);
  const [loader, setLoader] = useState([]);
  const [movieVideoData, setMovieVideoData] = useState([]);

  const navigate = useNavigate();

  const getMovieDetails = async ({ id }) => {
    setMovieDetail(await getMovie(`/movie/${id}`));
    setMovieVideoData((await getMovie(`/movie/${id}/videos`)).results[0]);
  };

  const getRecommendationMovies = async ({ id }) => {
    setLoader(true);
    setRMovies((await getMovie(`/movie/${id}/similar`))?.results);
    setLoader(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getMovieDetails({ id });
      getRecommendationMovies({ id });
    }
  }, [id]);

  return (
    <div
      style={{
        background: 'black',
      }}
    >
      <Container>
        <div
          className='slide'
          style={{ height: '650px', background: 'black', paddingTop: '100px', marginBottom: "15px"}}
        >
          <iframe
            width={'100%'}
            height={'100%'}
            src={
              'https://www.youtube-nocookie.com/embed/' +
              movieVideoData?.key +
              '?controls=0'
            }
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen=''
            
          />
        </div>
        {!!movieDetail?.original_title && (
          <>
            <div className='title'>
              {movieDetail.original_title}{' '}
              <span className='title' style={{ fontSize: '14px' }}>
                {moment
                  .utc(movieDetail.runtime * 1000 * 60)
                  .format('HH[h] : mm[m]')}
              </span>
            </div>
            <div
              className='title'
              style={{ fontSize: '18px', marginTop: '7px' }}
            >
              Genres:{' '}
              {movieDetail.genres.map(
                (e, i, arr) => e.name + (arr.length - 1 !== i ? ', ' : '')
              )}
            </div>
            <div
              className='title'
              style={{ fontSize: '18px', marginTop: '7px' }}
            >
              {movieDetail.overview}
            </div>
            <br />
            <br />
            <div className='title'>More Like this</div>
          </>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {!loader &&
            rMovies.map((movie) => {
              return (
                <>
                  <div
                    className='box'
                    onClick={() => navigate(`/trailer/${movie.id}`)}
                  >
                    <img
                      src={imageURL + movie.poster_path}
                      alt='movie'
                      width={'300px'}
                      height={'450px'}
                    />
                    <div
                      style={{
                        height: '1px',
                        width: '100%',
                        marginTop: '7px',
                        marginBottom: '7px',
                        background: 'white',
                      }}
                    />
                    <div
                      className='title'
                      style={{ fontSize: '18px', marginTop: '7px' }}
                    >
                      {movie.title}
                    </div>
                    <div
                      className='title'
                      style={{ fontSize: '14px', marginTop: '7px' }}
                    >
                      {movie.overview}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </Container>
    </div>
  );
}

export default Trailer;

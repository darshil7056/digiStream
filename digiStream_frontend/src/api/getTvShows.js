import axios from 'axios';

const getTvShows = (route) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${route}?api_key=3926dff0d2826b265d5396981f90bd1c`
    )
    .then((data) => {
      return data.data;
    })
    .catch(() => []);
};
export default getTvShows;

//3926dff0d2826b265d5396981f90bd1c
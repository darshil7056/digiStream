import axios from 'axios';

const getMovie = (route) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${route}?api_key=3926dff0d2826b265d5396981f90bd1c`
    )
    .then((data) => {
      return data.data;
    })
    .catch(() => []);
};
export default getMovie;

//3926dff0d2826b265d5396981f90bd1c
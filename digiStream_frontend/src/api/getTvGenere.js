import axios from 'axios';

const getTvGenere = (route) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${route}?api_key=3926dff0d2826b265d5396981f90bd1c`
    )
    .then((response) => {
      return response.data.genres;
    })
    .catch(() => []);
};
export default getTvGenere;

//3926dff0d2826b265d5396981f90bd1c
import axios from 'axios';


const getCurrentMovieData = (movieId)=>{
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=3926dff0d2826b265d5396981f90bd1c&language=en-US&page=1`).then(data => {
        if(data.status === 200){
            return data.data
        }
    });

}
export default getCurrentMovieData
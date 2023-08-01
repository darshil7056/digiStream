import axios from 'axios';


const getRecommendationData = ()=>{
    return axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=3926dff0d2826b265d5396981f90bd1c").then(bar => {
        return bar
    });

}
export default getRecommendationData
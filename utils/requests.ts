const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
	fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=es-ES`,
	fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_networks=213`,
	fetchMejorValoradas: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`,
	fetchPeliculasAccion: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=28`,
	fetchPeliculasComedia: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=35`,
	fetchPeliculasTerror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=27`,
	fetchPeliculasRomanticas: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=10749`,
	fetchDocumentales: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=99`,
	fetchSeries: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=es-ES&page=1`,
	fetchSeries2: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=es-ES&page=2`,
	fetchSeries3: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=es-ES&page=4`,
	fetchPeliculasTrending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES&page=1`,
	fetchPeliculasTrending2: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES&page=2`,
	fetchPeliculasTrending3: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES&page=3`,
	fetchPeliculasPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`,
	fetchPeliculasPopular2: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=2`,
	fetchPeliculasPopular3: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=3`,
};

export default requests;

import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import { Pelicula } from '../typings';
import requests from '../utils/requests';

interface Props {
	netflixOriginals: Pelicula[];
	tendenciaAhora: Pelicula[];
	mejorValoradas: Pelicula[];
	peliculasAccion: Pelicula[];
	peliculasComedia: Pelicula[];
	peliculasTerror: Pelicula[];
	peliculasRomanticas: Pelicula[];
	documentales: Pelicula[];
}

const Home = ({
	netflixOriginals,
	tendenciaAhora,
	mejorValoradas,
	peliculasAccion,
	peliculasComedia,
	peliculasTerror,
	peliculasRomanticas,
	documentales,
}: Props) => {
	const { logout, loading } = useAuth();

	if (loading) return null;

	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] `}
		>
			<Head>
				<title>Página Principal - Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
				<Banner netflixOriginals={netflixOriginals} />
				<section className="md:space-y-24">
					<Row titulo="Tendencias Ahora" peliculas={tendenciaAhora} />
					<Row titulo="Películas Mejor Valoradas" peliculas={mejorValoradas} />
					<Row titulo="Películas de Acción" peliculas={peliculasAccion} />
					{/* Mi Lista */}

					<Row titulo="Películas de Comedia" peliculas={peliculasComedia} />
					<Row titulo="Películas de Terror" peliculas={peliculasTerror} />
					<Row titulo="Películas Románticas" peliculas={peliculasRomanticas} />
					<Row titulo="Documentales" peliculas={documentales} />
				</section>
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		tendenciaAhora,
		mejorValoradas,
		peliculasAccion,
		peliculasComedia,
		peliculasTerror,
		peliculasRomanticas,
		documentales,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchMejorValoradas).then((res) => res.json()),
		fetch(requests.fetchPeliculasAccion).then((res) => res.json()),
		fetch(requests.fetchPeliculasComedia).then((res) => res.json()),
		fetch(requests.fetchPeliculasTerror).then((res) => res.json()),
		fetch(requests.fetchPeliculasRomanticas).then((res) => res.json()),
		fetch(requests.fetchDocumentales).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			tendenciaAhora: tendenciaAhora.results,
			mejorValoradas: mejorValoradas.results,
			peliculasAccion: peliculasAccion.results,
			peliculasComedia: peliculasComedia.results,
			peliculasTerror: peliculasTerror.results,
			peliculasRomanticas: peliculasRomanticas.results,
			documentales: documentales.results,
		},
	};
};

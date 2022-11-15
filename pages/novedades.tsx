import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import GridNovedades from '../components/GridNovedades';
import GridPeliculas from '../components/GridPeliculas';
import Grid from '../components/GridSeries';
import Header from '../components/Header';
import Modal from '../components/Modal';
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
	series: Pelicula[];
	series2: Pelicula[];
	series3: Pelicula[];
	peliculasTendencia: Pelicula[];
	peliculasTendencia2: Pelicula[];
	peliculasTendencia3: Pelicula[];
	peliculasPopular: Pelicula[];
	peliculasPopular2: Pelicula[];
	peliculasPopular3: Pelicula[];
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
	series,
	series2,
	series3,
	peliculasTendencia,
	peliculasTendencia2,
	peliculasTendencia3,
	peliculasPopular,
	peliculasPopular2,
	peliculasPopular3,
}: Props) => {
	const { logout, loading } = useAuth();
	const showModal = useRecoilValue(modalState);

	if (loading) return null;

	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[120vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>Novedades - Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative  pl-4 pr-4 pb-24 lg:space-y-24  lg:pl-16 lg:pr-16">
				<GridNovedades
					peliculas1={peliculasPopular}
					peliculas2={peliculasPopular2}
					peliculas3={peliculasPopular3}
				/>
			</main>
			{showModal && <Modal />}
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
		series,
		series2,
		series3,
		peliculasTendencia,
		peliculasTendencia2,
		peliculasTendencia3,
		peliculasPopular,
		peliculasPopular2,
		peliculasPopular3,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchMejorValoradas).then((res) => res.json()),
		fetch(requests.fetchPeliculasAccion).then((res) => res.json()),
		fetch(requests.fetchPeliculasComedia).then((res) => res.json()),
		fetch(requests.fetchPeliculasTerror).then((res) => res.json()),
		fetch(requests.fetchPeliculasRomanticas).then((res) => res.json()),
		fetch(requests.fetchDocumentales).then((res) => res.json()),
		fetch(requests.fetchSeries).then((res) => res.json()),
		fetch(requests.fetchSeries2).then((res) => res.json()),
		fetch(requests.fetchSeries3).then((res) => res.json()),
		fetch(requests.fetchPeliculasTrending).then((res) => res.json()),
		fetch(requests.fetchPeliculasTrending2).then((res) => res.json()),
		fetch(requests.fetchPeliculasTrending3).then((res) => res.json()),
		fetch(requests.fetchPeliculasPopular).then((res) => res.json()),
		fetch(requests.fetchPeliculasPopular2).then((res) => res.json()),
		fetch(requests.fetchPeliculasPopular3).then((res) => res.json()),
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
			series: series.results,
			series2: series2.results,
			series3: series3.results,
			peliculasTendencia: peliculasTendencia.results,
			peliculasTendencia2: peliculasTendencia2.results,
			peliculasTendencia3: peliculasTendencia3.results,
			peliculasPopular: peliculasPopular.results,
			peliculasPopular2: peliculasPopular2.results,
			peliculasPopular3: peliculasPopular3.results,
		},
	};
};

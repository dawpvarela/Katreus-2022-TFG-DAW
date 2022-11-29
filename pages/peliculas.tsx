import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import GridPeliculas from '../components/GridPeliculas';
import Header from '../components/Header';
import Modal from '../components/Modal';
import useAuth from '../hooks/useAuth';
import { Pelicula } from '../typings';
import requests from '../utils/requests';

interface Props {
	peliculasTendencia: Pelicula[];
	peliculasTendencia2: Pelicula[];
	peliculasTendencia3: Pelicula[];
}

const Home = ({
	peliculasTendencia,
	peliculasTendencia2,
	peliculasTendencia3,
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
				<title>Películas - Katreus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative  pl-4 pr-4 pb-24 lg:space-y-24  lg:pl-16 lg:pr-16">
				<Banner netflixOriginals={peliculasTendencia} />

				<GridPeliculas
					peliculas1={peliculasTendencia}
					peliculas2={peliculasTendencia2}
					peliculas3={peliculasTendencia3}
				/>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [peliculasTendencia, peliculasTendencia2, peliculasTendencia3] =
		await Promise.all([
			fetch(requests.fetchPeliculasTrending).then((res) => res.json()),
			fetch(requests.fetchPeliculasTrending2).then((res) => res.json()),
			fetch(requests.fetchPeliculasTrending3).then((res) => res.json()),
		]);

	return {
		props: {
			peliculasTendencia: peliculasTendencia.results,
			peliculasTendencia2: peliculasTendencia2.results,
			peliculasTendencia3: peliculasTendencia3.results,
		},
	};
};

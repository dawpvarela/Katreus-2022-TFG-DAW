import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import GridNovedades from '../components/GridNovedades';
import Header from '../components/Header';
import Modal from '../components/Modal';
import useAuth from '../hooks/useAuth';
import { Pelicula } from '../typings';
import requests from '../utils/requests';

interface Props {
	peliculasPopular: Pelicula[];
	peliculasPopular2: Pelicula[];
	peliculasPopular3: Pelicula[];
}

const Home = ({
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
				<title>Novedades - Katreus</title>
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
	const [peliculasPopular, peliculasPopular2, peliculasPopular3] =
		await Promise.all([
			fetch(requests.fetchPeliculasPopular).then((res) => res.json()),
			fetch(requests.fetchPeliculasPopular2).then((res) => res.json()),
			fetch(requests.fetchPeliculasPopular3).then((res) => res.json()),
		]);

	return {
		props: {
			peliculasPopular: peliculasPopular.results,
			peliculasPopular2: peliculasPopular2.results,
			peliculasPopular3: peliculasPopular3.results,
		},
	};
};

import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import Grid from '../components/GridSeries';
import Header from '../components/Header';
import ModalSeries from '../components/ModalSeries';
import useAuth from '../hooks/useAuth';
import { Pelicula } from '../typings';
import requests from '../utils/requests';

interface Props {
	series: Pelicula[];
	series2: Pelicula[];
	series3: Pelicula[];
}

const Home = ({ series, series2, series3 }: Props) => {
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
				<title>Series TV - Katreus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative  pl-4 pr-4 pb-24 lg:space-y-24  lg:pl-16 lg:pr-16">
				<Banner netflixOriginals={series} />

				<Grid peliculas1={series} peliculas2={series2} peliculas3={series3} />
			</main>
			{showModal && <ModalSeries />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [series, series2, series3] = await Promise.all([
		fetch(requests.fetchSeries).then((res) => res.json()),
		fetch(requests.fetchSeries2).then((res) => res.json()),
		fetch(requests.fetchSeries3).then((res) => res.json()),
	]);

	return {
		props: {
			series: series.results,
			series2: series2.results,
			series3: series3.results,
		},
	};
};

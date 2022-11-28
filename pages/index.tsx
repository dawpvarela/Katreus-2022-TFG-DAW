import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Plans from '../components/Plans';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';
import useSubscription from '../hooks/useSubscription';
import payments from '../lib/stripe';
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
	products: Product[];
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
	products,
}: Props) => {
	console.log(products);
	const { user, loading } = useAuth();
	const showModal = useRecoilValue(modalState);
	const subscription = useSubscription(user);
	const movie = useRecoilValue(movieState);
	const list = useList(user?.uid);

	if (loading || subscription === null) return null;

	if (!subscription) return <Plans products={products} />;

	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>Página Principal - Katreus</title>
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
					{list.length > 0 && <Row titulo="Mi Lista" peliculas={list} />}
					<Row titulo="Películas de Comedia" peliculas={peliculasComedia} />
					<Row titulo="Películas de Terror" peliculas={peliculasTerror} />
					<Row titulo="Películas Románticas" peliculas={peliculasRomanticas} />
					<Row titulo="Documentales" peliculas={documentales} />
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products = await getProducts(payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then((res) => res)
		.catch((error) => console.log(error.message));

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
			products,
		},
	};
};

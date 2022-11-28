import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Pelicula } from '../typings';

interface Props {
	//Cuando se usa Firebase
	pelicula: Pelicula | DocumentData;
}

function Thumbnail({ pelicula }: Props) {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [peliculaActual, setCurrentMovie] = useRecoilState(movieState);

	return (
		<div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
			<Image
				onClick={() => {
					setCurrentMovie(pelicula);
					setShowModal(true);
				}}
				src={`https://image.tmdb.org/t/p/w500${
					pelicula.backdrop_path || pelicula.poster_path
				}`}
				className="rounded-sm object-cover md:rounded"
				layout="fill"
			/>
		</div>
	);
}

export default Thumbnail;

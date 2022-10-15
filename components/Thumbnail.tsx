import Image from 'next/image';
import { Pelicula } from '../typings';

interface Props {
	//Cuando se usa Firebase
	//pelicula: Pelicula | DocumentData
	pelicula: Pelicula;
}

function Thumbnail({ pelicula }: Props) {
	return (
		<div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
			<Image
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

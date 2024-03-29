import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { baseUrl } from '../constants/movie';
import { Pelicula } from '../typings';

interface Props {
	netflixOriginals: Pelicula[];
}

function Banner({ netflixOriginals }: Props) {
	const [pelicula, setPelicula] = useState<Pelicula | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [peliculaActual, setCurrentMovie] = useRecoilState(movieState);

	useEffect(() => {
		setPelicula(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
		);
	}, [netflixOriginals]);
	return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
				<Image
					layout="fill"
					src={`${baseUrl}${pelicula?.backdrop_path || pelicula?.poster_path}`}
					objectFit="cover"
				/>
			</div>

			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{pelicula?.title || pelicula?.name || pelicula?.original_name}
			</h1>
			<p className="text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:max-h-64 lg:text-2xl text-ellipsis overflow-hidden ">
				{pelicula?.overview}
			</p>
			<div className="flex space-x-3">
				<button className="bannerButton bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					Reproducir
				</button>

				<button
					className="bannerButton bg-[gray]/70"
					onClick={() => {
						setCurrentMovie(pelicula);
						setShowModal(true);
					}}
				>
					<InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> Más
					Información
				</button>
			</div>
		</div>
	);
}

export default Banner;

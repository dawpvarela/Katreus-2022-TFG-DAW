import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { Pelicula } from '../typings';
import Banner from './Banner';
import Thumbnail from './Thumbnail';

interface Props {
	//Cuando se usa Firebase
	//pelicula: Pelicula | DocumentData
	peliculas1: Pelicula[];
	peliculas2: Pelicula[];
	peliculas3: Pelicula[];
}

function GridPeliculas({ peliculas1, peliculas2, peliculas3 }: Props) {
	return (
		<div className="h-40 space-y-0.5 md:space-y-2">
			<h1 className=" lg:pr-16 text-2xl font-semibold md:text-4xl lg:text-7xl pt-20 pb-5 md:space-y-4">
				Películas
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center md:p-2">
				{peliculas1.map((pelicula) => (
					<Thumbnail key={pelicula.id} pelicula={pelicula} />
				))}
				{peliculas2.map((pelicula) => (
					<Thumbnail key={pelicula.id} pelicula={pelicula} />
				))}
				{peliculas3.map((pelicula) => (
					<Thumbnail key={pelicula.id} pelicula={pelicula} />
				))}
			</div>
		</div>
	);
}

export default GridPeliculas;

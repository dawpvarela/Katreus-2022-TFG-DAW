import { DocumentData } from 'firebase/firestore';
import { Pelicula } from '../typings';
import Thumbnail from './Thumbnail';

interface Props {
	peliculas: Pelicula[] | DocumentData[];
}

function GridMiLista({ peliculas }: Props) {
	return (
		<div className="h-40 space-y-0.5 md:space-y-2">
			<h1 className=" lg:pr-16 text-2xl font-semibold md:text-4xl lg:text-7xl pt-20 pb-5 md:space-y-4">
				Mi Lista
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center md:p-2">
				{peliculas.map((pelicula) => (
					<Thumbnail key={pelicula.id} pelicula={pelicula} />
				))}
			</div>
		</div>
	);
}

export default GridMiLista;

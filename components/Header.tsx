import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function Header() {
	return (
		<header>
			{/* Sección izquierda del Header */}
			<div className="flex items-center space-x-2 md:space-x-10">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
					width={100}
					height={100}
					className="cursor-pointer object-contain"
				/>
				<ul className="hidden space-x-4 md:flex">
					<li className="headerLink">Inicio</li>
					<li className="headerLink">Series TV</li>
					<li className="headerLink">Películas</li>
					<li className="headerLink">Novedades más vistas</li>
					<li className="headerLink">Mi Lista</li>
				</ul>
			</div>

			{/* Sección derecha del Header */}
			<div className="flex items-center space-x-4 text-sm font-light">
				<SearchIcon className="sm hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<BellIcon className="h-6 w-6" />
				<Link href="/account">
					<img
						src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
						alt=""
						className="cursor-pointer rounded"
					/>
				</Link>
			</div>
		</header>
	);
}

export default Header;

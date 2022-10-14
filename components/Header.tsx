import { BellIcon, SearchIcon } from '@heroicons/react/solid';

function Header() {
	return (
		<header>
			{/* Sección izquierda del Header */}
			<div className="">
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
			<div>
				<SearchIcon className="sm hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<BellIcon className="h-6 w-6" />
			</div>
		</header>
	);
}

export default Header;

import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const { logout } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`${!isScrolled && 'bg-gradient-to-t  to-black'} ${
				isScrolled && 'bg-[#141414]'
			}`}
		>
			<div className="flex items-center space-x-2 md:space-x-10">
				<Link href="/">
					<img
						src="/katreus.png"
						width={100}
						height={100}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<ul className="hidden space-x-4 md:flex">
					<Link href="/">
						<li className="headerLink cursor-default font-bold text-white hover:text-white">
							Inicio
						</li>
					</Link>
					<Link href="/series">
						<li className="headerLink">Series TV</li>
					</Link>
					<Link href="/peliculas">
						<li className="headerLink">Películas</li>
					</Link>
					<Link href="/novedades">
						<li className="headerLink">Novedades más vistas</li>
					</Link>
					<li className="headerLink">Mi Lista</li>
				</ul>
			</div>

			{/* Sección derecha del Header */}
			<div className="flex items-center space-x-4 text-sm font-light">
				<SearchIcon className="sm hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Infantil</p>
				<BellIcon className="h-6 w-6" />
				{/* <Link href="/account"> */}
				<img
					onClick={logout}
					src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
					alt=""
					className="cursor-pointer rounded"
				/>
				{/* </Link> */}
			</div>
		</header>
	);
}

export default Header;

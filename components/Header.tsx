import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import BasicMenu from './BasicMenu';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

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

				<BasicMenu />

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
					<Link href="/my-list">
						<li className="headerLink">Mi Lista</li>
					</Link>
				</ul>
			</div>

			{/* Sección derecha del Header */}
			<div className="flex items-center space-x-4 text-sm font-light">
				<SearchIcon className="sm hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Infantil</p>
				<BellIcon className="h-6 w-6" />
				<Link href="/account">
					<img
						src="https://rb.gy/g1pwyx"
						alt=""
						className="cursor-pointer rounded"
					/>
				</Link>
			</div>
		</header>
	);
}

export default Header;

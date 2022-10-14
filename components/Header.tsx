function Header() {
	return (
		<header>
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
			<div></div>
		</header>
	);
}

export default Header;

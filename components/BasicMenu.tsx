import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useState } from 'react';

export default function BasicMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="md:!hidden">
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className="!capitalize !text-white"
			>
				Menú
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				className="menu"
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Link href="/">
					<MenuItem onClick={handleClose}>Inicio</MenuItem>
				</Link>
				<Link href="/series">
					<MenuItem onClick={handleClose}>Series TV</MenuItem>
				</Link>
				<Link href="/peliculas">
					<MenuItem onClick={handleClose}>Películas</MenuItem>
				</Link>
				<Link href="/novedades">
					<MenuItem onClick={handleClose}>Novedades más vistas</MenuItem>
				</Link>
				<Link href="/my-list">
					<MenuItem onClick={handleClose}>Mi Lista</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}

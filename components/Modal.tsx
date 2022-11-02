import { XIcon } from '@heroicons/react/outline';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { Pelicula } from '../typings';

function Modal() {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [pelicula, setPelicula] = useState<Pelicula | null>(null);

	useEffect(() => {
		if (!pelicula) return;

		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					pelicula?.media_type === 'tv' ? 'tv' : 'movie'
				}/${pelicula?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=es-ES&append_to_response=videos`
			).then((response) => response.json());
		}
	}, []);

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<MuiModal open={showModal} onClose={handleClose}>
			<>
				<button
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
					onClick={handleClose}
				>
					<XIcon className="h-6 w-6" />
				</button>

				<div></div>
			</>
		</MuiModal>
	);
}

export default Modal;

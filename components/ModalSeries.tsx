import {
	CheckIcon,
	PlusIcon,
	ThumbUpIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from '@heroicons/react/outline';
import MuiModal from '@mui/material/Modal';
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { Elemento, Genero, Pelicula } from '../typings';

function ModalSeries() {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [pelicula, setPelicula] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState('');
	const [genres, setGenres] = useState<Genero[]>([]);
	const [muted, setMuted] = useState(true);
	const [addedToList, setAddedToList] = useState(false);
	const { user } = useAuth();
	const [peliculas, setPeliculas] = useState<DocumentData[] | Pelicula[]>([]);

	const toastStyle = {
		background: 'white',
		color: 'black',
		fontWeight: 'bold',
		fontSize: '16px',
		padding: '15px',
		borderRadius: '9999px',
		maxWidth: '1000px',
	};

	useEffect(() => {
		if (!pelicula) return;

		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${'tv' ? 'tv' : 'movie'}/${
					pelicula?.id
				}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			).then((response) => response.json());

			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Elemento) => element.type === 'Trailer'
				);
				setTrailer(data.videos?.results[index]?.key);
			}

			if (data?.genres) {
				setGenres(data.genres);
			}
		}

		fetchMovie();
	}, [pelicula]);

	// Encuentra todas la peliculas que tiene el usuario en su lista
	useEffect(() => {
		if (user) {
			return onSnapshot(
				collection(db, 'customers', user.uid, 'myList'),
				(snapshot) => setPeliculas(snapshot.docs)
			);
		}
	}, [db, pelicula?.id]);

	// Ve si la pelicula seleccionada ya esta en la lista del usuario
	useEffect(
		() =>
			setAddedToList(
				peliculas.findIndex((result) => result.data().id === pelicula?.id) !==
					-1
			),
		[peliculas]
	);

	const handleList = async () => {
		if (addedToList) {
			await deleteDoc(
				doc(db, 'customers', user!.uid, 'myList', pelicula?.id.toString()!)
			);

			toast(
				`${
					pelicula?.title || pelicula?.original_name
				} se ha quitado de Mi Lista`,
				{
					duration: 8000,
					style: toastStyle,
				}
			);
		} else {
			await setDoc(
				doc(db, 'customers', user!.uid, 'myList', pelicula?.id.toString()!),
				{
					...pelicula,
				}
			);

			toast(
				`${
					pelicula?.title || pelicula?.original_name
				} ha sido añadido a Mi Lista.`,
				{
					duration: 8000,
					style: toastStyle,
				}
			);
		}
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<MuiModal
			open={showModal}
			onClose={handleClose}
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
		>
			<>
				<Toaster position="bottom-center" />
				<button
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
					onClick={handleClose}
				>
					<XIcon className="h-6 w-6" />
				</button>

				<div className="relative  pt-[56.25%]">
					<img
						src="/trailerNoDisponible.png"
						width="100%"
						height="100%"
						className="cursor-pointer object-contain"
						style={{ position: 'absolute', top: '0', left: '0' }}
					/>
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width="100%"
						height="100%"
						style={{ position: 'absolute', top: '0', left: '0' }}
						playing
						muted={muted}
						loop={true}
					/>
					<div className="absolute bottom-10 flex w-full items-center justify-between px-10">
						<div className="flex space-x-2">
							<button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
								<FaPlay className="h-7 w-7 text-black" />
								Reproducir
							</button>

							<button className="modalButton" onClick={handleList}>
								{addedToList ? (
									<CheckIcon className="h-7 w-7" />
								) : (
									<PlusIcon className="h-7 w-7" />
								)}
							</button>

							<button className="modalButton">
								<ThumbUpIcon className="h-7 w-7" />
							</button>
						</div>
						<button className="modalButton" onClick={() => setMuted(!muted)}>
							{muted ? (
								<VolumeOffIcon className="h-6 w-6" />
							) : (
								<VolumeUpIcon className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center space-x-2 text-sm">
							<p className="font-semibold text-green-400">
								{(pelicula?.vote_average * 10).toFixed()}% de coincidencia
							</p>
							<p className="font-light">
								{pelicula?.release_date || pelicula?.first_air_date}
							</p>
							<div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
								HD
							</div>
						</div>
						<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
							<p className="w-5/6">{pelicula?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-[gray]">Géneros:</span>{' '}
									{genres.map((genre) => genre.name).join(', ')}
								</div>

								<div>
									<span className="text-[gray]">Idioma Original:</span>{' '}
									{pelicula?.original_language}
								</div>

								<div>
									<span className="text-[gray]">Votos totales:</span>{' '}
									{pelicula?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

export default ModalSeries;

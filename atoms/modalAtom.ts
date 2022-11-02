import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { Pelicula } from '../typings';

//Para crear el modal
export const modalState = atom({
	key: 'modalState',
	default: false,
});

//Para recoger la pelicula y almacenarla en el recoil
export const movieState = atom<Pelicula | DocumentData | null>({
	key: 'movieState',
	default: null,
});

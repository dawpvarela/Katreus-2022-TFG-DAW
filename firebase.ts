// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB4sRtDJalftpFYHRF0trnoQmqUIcnvjJw',
	authDomain: 'netflix-v2-bb223.firebaseapp.com',
	projectId: 'netflix-v2-bb223',
	storageBucket: 'netflix-v2-bb223.appspot.com',
	messagingSenderId: '1091323380832',
	appId: '1:1091323380832:web:d67365d72e46acf5b02f05',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

import Head from 'next/head';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import GridMiLista from '../components/GridMiLista';
import Header from '../components/Header';
import Modal from '../components/Modal';
import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';

function mylist() {
	const showModal = useRecoilValue(modalState);
	const { user } = useAuth();
	const list = useList(user?.uid);
	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[120vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>Mi Lista - Katreus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="relative  pl-4 pr-4 pb-24 lg:space-y-24  lg:pl-16 lg:pr-16">
				{list.length === 0 && (
					<div>
						<h1 className=" lg:pr-16 text-2xl font-semibold md:text-4xl lg:text-7xl pt-20 pb-5 md:space-y-4">
							Mi Lista
						</h1>
						<h2 className="  text-sm font-semibold text-[#6c42f5] transition duration-200  md:text-2xl">
							Añade cosas a tu lista para verlas en esta página.
						</h2>
					</div>
				)}
				{list.length > 0 && <GridMiLista peliculas={list} />}
			</main>
			{showModal && <Modal />}
		</div>
	);
}

export default mylist;

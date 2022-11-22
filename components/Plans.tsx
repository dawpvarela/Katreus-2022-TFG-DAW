import { CheckIcon } from '@heroicons/react/outline';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { loadCheckout } from '../lib/stripe';
import Loader from './Loader';
import Table from './Table';

interface Props {
	products: Product[];
}

function Plans({ products }: Props) {
	const { logout, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
	const [isBillingLoading, setBillingLoading] = useState(false);

	const subscribeToPlan = () => {
		if (!user) return;

		loadCheckout(selectedPlan?.prices[0].id!);
		setBillingLoading(true);
	};

	return (
		<div>
			<Head>
				<title>Katreus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="border-b border-white/10 bg-[#141414]">
				<Link href="/">
					<img
						src="/katreus.png"
						alt="Katreus"
						width={150}
						height={90}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<button
					className="text-lg font-medium hover:underline"
					onClick={logout}
				>
					Cerrar sesión
				</button>
			</header>
			<main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
				<h1 className="mb-3 text-3xl font-medium">
					Selecciona el plan ideal para ti
				</h1>
				<ul>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#6c42f5]" /> Ve todo lo que
						quieras.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#6c42f5]" /> Recomendaciones
						exclusivas para ti.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="h-7 w-7 text-[#6c42f5]" /> Cambia de plan o
						cancélalo cuando quieras.
					</li>
				</ul>

				<div className="mt-4 flex flex-col space-y-4">
					<div className="flex w-full items-center justify-end self-end md:w-3/5">
						{/* Planes */}
						{products.map((product) => (
							<div
								className={`planBox ${
									selectedPlan?.id === product.id
										? 'opacity-100 after:absolute after:top-full after:left-1/2 after:block after:-translate-x-1/2 after:border-8 after:border-b-0 after:border-transparent after:border-t-[#6c42f5] after:content-[""]'
										: 'opacity-60'
								}`}
								key={product.id}
								onClick={() => setSelectedPlan(product)}
							>
								{product.name}
							</div>
						))}
					</div>

					<Table products={products} selectedPlan={selectedPlan} />

					<button
						disabled={!selectedPlan || isBillingLoading}
						className={`mx-auto w-11/12 rounded bg-[#6c42f5] py-4 text-xl shadow hover:bg-[#6841e7] md:w-[420px] ${
							isBillingLoading && 'opacity-60'
						}`}
						onClick={subscribeToPlan}
					>
						{isBillingLoading ? (
							<Loader color="dark:fill-gray-300" />
						) : (
							'Suscribirse'
						)}
					</button>
				</div>
			</main>
		</div>
	);
}

export default Plans;

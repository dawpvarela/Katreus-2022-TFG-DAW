import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import { goToBillingPortal } from '../lib/stripe';
import Loader from './Loader';

function Membership() {
	const { user } = useAuth();
	const subscription = useSubscription(user);
	const [isBillingLoading, setBillingLoading] = useState(false);

	const manageSubscription = () => {
		if (subscription) {
			setBillingLoading(true);
			goToBillingPortal();
		}
	};

	return (
		<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
			<div className="space-y-2 py-4">
				<h4 className="text-lg text-[gray]">Suscripción & Facturación</h4>
				<button
					disabled={isBillingLoading || !subscription}
					className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
					onClick={manageSubscription}
				>
					{isBillingLoading ? (
						<Loader color="dark:fill-[#6c42f5]" />
					) : (
						'Cancelar Suscripción'
					)}
				</button>
			</div>

			<div className="col-span-3">
				<div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
					<div>
						<p className="font-medium">{user?.email}</p>
						<p className="text-[gray]">Contraseña: ********</p>
					</div>
					<div className="md:text-right">
						<p className="membershipLink">Cambiar dirección de la cuenta</p>
						<p className="membershipLink">Cambiar contraseña</p>
					</div>
				</div>

				<div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
					<div>
						<p>
							{subscription?.cancel_at_period_end
								? 'Tu suscripción acabaré el '
								: 'Tu próxima facturación es el '}
							{subscription?.current_period_end}
						</p>
					</div>
					<div className="md:text-right">
						<p className="membershipLink" onClick={goToBillingPortal}>
							Gestionar información de pago
						</p>
						<p className="membershipLink" onClick={goToBillingPortal}>
							Añadir un método de pago secundario
						</p>
						<p className="membershipLink" onClick={goToBillingPortal}>
							Datos de facturación
						</p>
						<p className="membershipLink">Cambiar día de facturación</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Membership;

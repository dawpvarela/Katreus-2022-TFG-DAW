import { CheckIcon } from '@heroicons/react/outline';
import { Product } from '@stripe/firestore-stripe-payments';

interface Props {
	products: Product[];
	selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: Props) {
	return (
		<table>
			<tbody className="divide-y divide-[gray]">
				<tr className="tableRow">
					<td className="tableDataTitle">Precio al mes</td>
					{products.map((product) => (
						<td
							className={`tableDataFeature ${
								selectedPlan?.id === product.id
									? 'text-[#6c42f5]'
									: 'text-[gray]'
							}`}
							key={product.id}
						>
							{product.prices[0].unit_amount! / 100}€
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">Calidad de vídeo</td>
					{products.map((product) => (
						<td
							className={`tableDataFeature ${
								selectedPlan?.id === product.id
									? 'text-[#6c42f5]'
									: 'text-[gray]'
							}`}
							key={product.id}
						>
							{product.metadata.videoQuality}
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">Resolución</td>
					{products.map((product) => (
						<td
							className={`tableDataFeature ${
								selectedPlan?.id === product.id
									? 'text-[#6c42f5]'
									: 'text-[gray]'
							}`}
							key={product.id}
						>
							{product.metadata.resolution}
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">
						Multidispositivo: TV, ordenador, teléfono móvil y tableta
					</td>
					{products.map((product) => (
						<td
							className={`tableDataFeature ${
								selectedPlan?.id === product.id
									? 'text-[#6c42f5]'
									: 'text-[gray]'
							}`}
							key={product.id}
						>
							{product.metadata.portability === 'true' && (
								<CheckIcon className="inline-block h-8 w-8" />
							)}
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">Descargas</td>
					{products.map((product) => (
						<td
							className={`tableDataFeature ${
								selectedPlan?.id === product.id
									? 'text-[#6c42f5]'
									: 'text-[gray]'
							}`}
							key={product.id}
						>
							{product.metadata.download === 'true' && (
								<CheckIcon className="inline-block h-8 w-8" />
							)}
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
}

export default Table;

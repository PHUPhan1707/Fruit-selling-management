import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const ProductDistribution = ({ productDistribution }) => {
	const productInWarehouse = productDistribution?.productInWarehouse
	const productOnShelf = productDistribution?.productOnShelf
	const productSold = productDistribution?.productSold

	return (
		<div className="relative rounded-xl p-2 bg-green_dark1">
			<div className="absolute leading-3">
				<i className="fa fa-circle rounded-full border border-green_dark1 text-[0.8rem] text-offwhite"></i>
			</div>
			<div className="flex p-4">
				<div className="w-1/2 space-y-2 text-[#FFFFFF]">
					<span className="text-[1.125rem] font-bold">
						Product Distribution
					</span>
					<Pie
						className=""
						data={{
							labels: [],
							datasets: [
								{
									label: '',
									data: [productInWarehouse, productOnShelf, productSold],
									backgroundColor: ['#5c28b1', '#01d492', '#e53f52'],
									borderWidth: 0,
									borderColor: '#FFFFFF',
								},
							],
						}}
						options={{
							cutout: '65%', // This creates the donut hole
						}}
					></Pie>

				</div>


				<div className="w-[50%] flex items-center justify-center">
					<div className="space-y-4 ">
						<div className="flex space-x-2">
							<div className="h-4 w-4 rounded-full bg-[#5c28b1]"></div>
							<span className="text-[1rem] text-[#FFFFFF]">Product in warehouse</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full bg-[#01d492]"></div>
							<span className="text-[1rem] text-[#FFFFFF]">Product on shelf</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full bg-[#e53f52]"></div>
							<span className="text-[1rem] text-[#FFFFFF]">Product sold</span>
						</div>
					</div>
				</div>


			</div>
		</div>
	)
}

export default ProductDistribution
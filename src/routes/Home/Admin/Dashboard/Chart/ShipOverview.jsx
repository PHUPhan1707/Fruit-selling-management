import { Pie } from 'react-chartjs-2'

const ShipOverview = () => {
	return (
		<div className="relative rounded-xl p-2 bg-green_dark1">
			<div className="absolute leading-3">
				<i className="fa fa-circle rounded-full border border-green_dark1 text-[0.8rem] text-offwhite"></i>
			</div>
			<div className="flex p-4">
				<div className="w-1/2 space-y-2 text-[#FFFFFF]">
					<span className="text-[1.125rem] font-bold">
						Shipping Overview
					</span>
					<div className="space-y-4">

						<Pie
							className=""
							data={{
								labels: [],
								datasets: [
									{
										label: '',
										data: [300, 50],
										backgroundColor: ['#F07167', '#A0D900'],
										borderWidth: 0,
									},
								],
							}}
							options={{
								cutout: '65%', // This creates the donut hole
							}}
						></Pie>

					</div>
				</div>

				<div className="w-[50%] flex items-center justify-center">
					<div className="space-y-4 ">
						<div className="flex space-x-2">
							<div className="h-4 w-4 rounded-full bg-[#F07167]"></div>
							<span className="text-[1rem] text-[#FFFFFF]">Ongoing</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full bg-[#A0D900]"></div>
							<span className="text-[1rem] text-[#FFFFFF]">Completed</span>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default ShipOverview

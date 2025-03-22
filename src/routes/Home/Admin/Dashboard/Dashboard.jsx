import { useDispatch, useSelector } from 'react-redux'
import BestSelling from './Chart/BestSelling'
import Cupon from './Chart/Foot/Cupon'
import NewCus from './Chart/Foot/NewCus'
import OrderChart from './Chart/OrderChart'
import ProductDistribution from './Chart/ProductDistribution'
import ShipOverview from './Chart/ShipOverview'
import Total from './Chart/Total'
import WarehouseAct from './Chart/WarehouseAct'
import WasteProduct from './Chart/WasteProduct'
import WeeklyRevenue from './Chart/WeeklyRevenue'
import { useEffect } from 'react'
import { dashboardThunk } from '../../../../redux/dashboardReducer/dashboardThunk'

const Dashboard = () => {
	const dispatch = useDispatch()
	const { data } = useSelector((state) => state.dashboardReducer)

	const sampleWeeklyRevenue = [
		{ date: "Saturday", totalRevenue: 1000 },
		{ date: "Sunday", totalRevenue: 1800 },
		{ date: "Monday", totalRevenue: 1500 },
		{ date: "Tuesday", totalRevenue: 2800 },
		{ date: "Wednesday", totalRevenue: 2000 },
		{ date: "Thursday", totalRevenue: 3000 },
		{ date: "Friday", totalRevenue: 2200 },
	];

	const sampleWeeklyOrders = [
		{ date: "Saturday", placedOrders: 10, packagedOrders: 5, shippedOrders: 2 },
		{ date: "Sunday", placedOrders: 15, packagedOrders: 8, shippedOrders: 3 },
		{ date: "Monday", placedOrders: 12, packagedOrders: 6, shippedOrders: 4 },
		{ date: "Tuesday", placedOrders: 20, packagedOrders: 10, shippedOrders: 5 },
		{ date: "Wednesday", placedOrders: 18, packagedOrders: 7, shippedOrders: 3 },
		{ date: "Thursday", placedOrders: 25, packagedOrders: 12, shippedOrders: 6 },
		{ date: "Friday", placedOrders: 22, packagedOrders: 9, shippedOrders: 4 },
	];

	useEffect(() => {
		dispatch(dashboardThunk())
	}, [dispatch])

	// Default values
	const defaultWarehouseActivities = { incoming: [], outgoing: [] }

	return (
		<div className="space-y-8 p-8">
			{/* Title */}
			<div className="text-green_dark1">
				<div className="text-[1.635rem] font-extrabold">Dashboard</div>
				<span className="text-[1.25rem] font-medium">Logistics Overview</span>
			</div>

			<div className="space-x-4 space-y-4">
				<div className="w-[100%]">
					<Total
						revenue={data?.revenue}
						cost={data?.cost}
						orderVolume={data?.orderVolume}
						productionVolume={data?.productionVolume}
					/>
				</div>
				{/* <div className="w-[20%] space-y-4">
					<BestSelling bestSellingProducts={data?.bestSellingProducts} />
					<WasteProduct />
				</div> */}
			</div>

			<div className="flex space-x-8">
				<div className="w-[40%]">
					<div className="mb-8">
						<ProductDistribution
							productDistribution={data?.productDistribution}
						/>
					</div>
					<ShipOverview />
				</div>
				<div className="w-[60%]">
					{/* <OrderChart weeklyOrders={data?.weeklyOrders} /> */}
					<OrderChart weeklyOrders={sampleWeeklyOrders} />
				</div>
			</div>

			<div className="flex space-x-8">
				<div className="w-[35%]">
					<WarehouseAct
						incoming={
							data?.warehouseActivities?.incoming ??
							defaultWarehouseActivities.incoming
						}
						outgoing={
							data?.warehouseActivities?.outgoing ??
							defaultWarehouseActivities.outgoing
						}
					/>
				</div>
				<div className="w-[65%]">
					{/* <WeeklyRevenue weeklyRevenue={data?.weeklyRevenue} /> */}
					<WeeklyRevenue weeklyRevenue={sampleWeeklyRevenue} />
				</div>
			</div>
			<div className="flex space-x-8">
				<div className="w-[75%]">
					<Cupon />
				</div>
				<div className="w-[25%]">
					<NewCus customers={data?.customers} />
				</div>

			</div>
		</div>
	)
}

export default Dashboard

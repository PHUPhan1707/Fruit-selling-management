import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import ExploreFruit from '../../../../components/ExploreFruit/ExploreFruit';
import ExploreSupplier from '../../../../components/ExploreSupplier/ExploreSupplier';
import Daily from '../../../../components/DailyDeals/DailyDeals';
import ProductCard from './ProductCard'; // Reusable component
import tomatoImg from '../../../../assets/tomato.jpg';
import gingerImg from '../../../../assets/ginger.jpg';
import bananaImg from '../../../../assets/banana.jpg';
import orangeImg from '../../../../assets/orange.jpg';



// Sample Product Data
const products = [
	{ id: 1, name: "Heirloom tomato", price: "$5.99 / lb", location: "Grown in San Juan Capistrano, CA", image: tomatoImg, route: "/customer/store/tomato" },
	{ id: 2, name: "Organic ginger", price: "$12.99 / lb", location: "Grown in Huntington Beach, CA", image: gingerImg, route: "/customer/store/ginger" },
	{ id: 3, name: "Amazing banana", price: "$4.5 / lb", location: "Grown in Bangkok, Thailand", image: bananaImg, route: "/custormer/store/banana"},
	{ id: 4, name: "Healthy orange", price: "$10.5 / lb", location: "Grown in Vuon Lai, Vietnam", image: orangeImg, route: "/custormer/store/orange"}
];

const TopFruit = () => {
	const navigate = useNavigate();
	const [sortOrder, setSortOrder] = useState("A-Z");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSort = () => {
		setSortOrder(sortOrder === "A-Z" ? "Z-A" : "A-Z");
	};

	return (
		<div className="bg-[#FAFAFA] min-h-screen">
			{/* Header */}
			<header className="flex justify-between items-center p-6 border-b bg-white shadow-sm">
				<h1 className="text-[#485935] text-4xl font-Newsreader font-medium">Manach</h1>
				<nav className="space-x-6 text-gray-600 text-lg">
					<a href="#" className="hover:text-green-700">Shop</a>
					<a href="#" className="hover:text-green-700">Who we are</a>
					<a href="#" className="hover:text-green-700">My profile</a>
					<button className="bg-green-700 text-white px-5 py-2 rounded-lg font-medium">
						Basket (3)
					</button>
				</nav>
			</header>

			<div className="px-16 py-10 border-b pb-2 flex justify-between items-baseline">
				{/* Title Section */}
				<div className="flex gap-1 items-baseline">
					<h2 className="text-[42px] font-regular font-Newsreader text-[#000000] leading-none">
						Products
					</h2>
					<span></span>
					<span></span>
					<span className="text-[#000000] font-medium font-Inter text-xl">
						Fresh
					</span>
					<span className="text-[#000000] font-Inter font-light text-xl">
						— August 21, 2023
					</span>
				</div>

				{/* Sorting & View Options */}
				<div className="flex space-x-3">
					<button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
						Default
					</button>
					<button onClick={handleSort} className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-600">
						{sortOrder}
					</button>
					<button className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-600">
						List view
					</button>
				</div>
			</div>


			{/* Products & Sidebar */}
			<div className="flex px-16 mt-6">
				{/* Product Grid */}
				<div className="grid grid-cols-2 gap-x-6 gap-y-4 w-3/4 items-start content-start">
				{products.map((product) => (
						<div key={product.id} onClick={() => navigate(product.route)}>
							<ProductCard product={product} />
						</div>
					))}
				</div>

				{/* Sidebar */}
				<div className="w-1/4 ml-16 space-y-6">
					<ExploreFruit />
					<ExploreSupplier />
					<Daily />
				</div>
			</div>
		</div>
	);
};

export default TopFruit;

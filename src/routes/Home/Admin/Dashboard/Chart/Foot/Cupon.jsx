const Cupon = () => {
	return (
		<div className="relative h-full rounded-xl border bg-green_dark1 p-2">
			<div className="absolute leading-3">
				<i className="fa fa-circle rounded-full border border-green_dark1 text-[0.8rem] text-offwhite"></i>
			</div>
			<div className="flex space-x-72 p-4 pb-0 text-offwhite">
				<span className="flex text-[1.125rem] font-bold">Coupons</span>
				<div className="text-[1.25rem] font-semibold text-[red]">
					SALE OFF %
				</div>
			</div>

			<div className="flex justify-between p-4">
				<div className="flex w-[32%] justify-between rounded-lg bg-[#ff4336] px-7 py-6 text-[1.125rem] text-offwhite">
					<div className="font-bold">Strawbery</div>
					<span>5%</span>
				</div>
				<div className="flex w-[32%] justify-between rounded-lg bg-[#ff4336] px-7 py-6 text-[1.125rem] text-offwhite">
					<div className="font-bold">Banana</div>
					<span>3%</span>
				</div>
				<div className="flex w-[32%] justify-between rounded-lg bg-[#ff4336] px-7 py-6 text-[1.125rem] text-offwhite">
					<div className="font-bold">Coconut</div>
					<span>8%</span>
				</div>
			</div>
		</div>
	)
}

export default Cupon

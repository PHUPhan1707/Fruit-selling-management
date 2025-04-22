const WhatSetsUsApart = () => {
	return (
		<div className="mt-[100px]" >
			{/*What sets us apart?*/}
			<div
				style={{
					
					height: '128vh',
					backgroundColor: 'white',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px'
				}}
			>
				<div
					style={{
						width: '80%',
						border: '5px solid black',
						borderRadius: '15px',  // Bo tròn góc
						padding: '40px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'relative', // Để đặt tiêu đề bên ngoài
					}}
				>
					{/* Tiêu đề nhô lên trên viền */}
					<div
						style={{
							position: 'absolute',
							top: '-80px',
							fontSize: '80px',
							fontWeight: '700',
							color: 'green',
							fontFamily: 'Newsreader',
							textAlign: 'center',
							zIndex: 1, // Đặt trên viền
						}}
					>
						Soak with freshness
						<div
							style={{
								position: 'absolute',
								top: '50%', // Căn chính giữa chữ
								left: -20,
								right: -20,

								height: '40px', // Điều chỉnh độ dày để che viền
								backgroundColor: 'white',
								zIndex: -3, // Đặt dưới chữ nhưng trên viền
							}}
						/>
					</div>



					{/* Nội dung mô tả */}
					<div
						style={{
							width: '700px',
							height: '138px',
							color: 'black',
							fontFamily: 'Poppins',
							fontSize: '20px',
							fontWeight: '500',
							textAlign: 'center',
							marginTop: '40px',

						}}
					>
						Tailor your culinary adventure with our personalized options. We source only the finest, locally-sourced ingredients to ensure each meal is a masterpiece.
					</div>

					{/* Hình ảnh */}

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(2, minmax(300px, 1fr))", // 2 cột
							gridGap: "50px",
							marginTop: "60px",
						}}
					>
						<div className="m-auto h-fit w-full">
							<img
								src="/src/assets/pic_1.png"
								alt=""
								style={{
									width: "300px",
									height: "350px",
									borderRadius: "10px",
									objectFit: "cover",
								}}
							/>
						</div>
						<div className="m-auto h-fit w-full">
							<img
								src="/src/assets/pic_1.png"
								alt=""
								style={{
									width: "300px",
									height: "350px",
									borderRadius: "10px",
									objectFit: "cover",
								}}
							/>
						</div>
						<div className="m-auto h-fit w-full">
							<img
								src="/src/assets/pic_2.png"
								alt=""
								style={{
									width: "300px",
									height: "350px",
									borderRadius: "10px",
									objectFit: "cover",
								}}
							/>
						</div>
						<div className="m-auto h-fit w-full">
							<img
								src="/src/assets/pic_3.png"
								alt=""
								style={{
									width: "300px",
									height: "350px",
									borderRadius: "10px",
									objectFit: "cover",
								}}
							/>
						</div>
					</div>

				</div>
			</div>

			{/*What are you craving for?*/}
			<div className="flex   mx-auto mt-20">
				<div>
					<img
						src="/src/assets/pic_4.png"
						alt=""
						style={{
							// position: 'absolute', top: '128vh', left: '0',
							width: '100%',
							height: '100%',
							background:
								'url(<path-to-image>) lightgray 50% / cover no-repeat',
						}}
					/>
				</div>

				<div className="m-auto">
					<div
						style={{
							width: '533px',
							height: '60px',
							color: '#485935',
							fontSize: '40px',
							fontHeight: '700',
							whiteSpace: 'nowrap',
						}}
					>
						What are you craving for?
					</div>
					<div
						style={{
							width: '179px',
							height: '36px',
							color: '#485935',
							fontSize: '24px',
							fontWeight: '500',
							paddingTop: '27px',
						}}
					>
						Visit our store
					</div>
					<div
						style={{
							width: '531px',
							height: '164px',
							color: '#485935',
							fontSize: '16px',
							fontWeight: '400',
							paddingTop: '60px',
						}}
					>
						Discover a world of flavors and delights at our store. Whether you
						have a sweet tooth or a savory craving, we have something to satisfy
						every taste bud. From freshly baked goods to gourmet treats, our
						selection is sure to please. Experience the finest quality products
						and exceptional service. Indulge in your cravings and find your
						favorites today. Visit us and treat yourself to a delightful
						shopping experience. Your cravings deserve the best, and that's
						exactly what we offer. Come see us and explore the delicious
						possibilities!
					</div>
					<div style={{ marginLeft: '12rem', paddingTop: '120px' }}>
						<button
							style={{
								width: '186px',
								height: '38px',
								backgroundColor: '#93A267',
								fontColor: '#48593',
								fontFamily: 'Poppins',
								fontSize: '20px',
								fontWeight: '500',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer',
							}}
						>
							VISIT STORE
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WhatSetsUsApart

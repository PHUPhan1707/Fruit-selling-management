/* eslint-disable react/no-unescaped-entities */
const Carousel = () => {
	return (
		<div className="relative mt-[20px] w-full">
			<div className="w-full  text-center">
				<div className="h-[21.1875rem]  text-center">
					<span
						style={{
							color: 'var(--Green-dark1, #485935)',
							textAlign: 'center',
							fontSize: '4.6875rem',
							fontFamily: 'Newsreader',
							fontWeight: 500,
							lineHeight: '1.0',
						}}
					>
						We’re{' '}
						<span style={{ fontFamily: 'Newsreader', fontStyle: 'italic' }}>
							purveyors, and eaters
						</span>{' '}
						of <br /> organically grown food.
					</span>
				</div>
				<div
					style={{
						borderRadius: '0.625rem',
						background: 'var(--Green-dark1, #485935)',
						width: '15.375rem',
						height: '4.125rem',
						margin: 'auto',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'relative',
						top: '-50px',
					}}
				>
					<span
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: '1.25rem',
							fontStyle: 'normal',
							fontWeight: 500,
							lineHeight: 'normal',
						}}
					>
						Browse our shop{' '}
					</span>
				</div>
			</div>

			 
		</div>
	)
}

export default Carousel

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userThunk } from '../../redux/userReducer/userThunk'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogin = () => {
		const data = {
			user_name: username,
			user_password: password,
		}
		dispatch(userThunk(data))
			.then((res) => {
				console.log(res.payload)
				if (res.payload.role_id == 2) {
					navigate('/customer/home')
				} else navigate('/admin/home')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div>
			{' '}
			<div>
				<div
					className="w-full"
					style={{
						color: 'rgb(23, 51, 52)',
						fontSize: '3.125rem',
						fontWeight: 600,
					}}
				>
				</div>
				<div>
					<NavLink
						to={'/auth/welcome'}
						className={'rounded-xl border border-[rgb(23,51,52)] px-4 py-2'}
					>
						<span className="text-[rgb(23,51,52)]">Back</span>
					</NavLink>
				</div>
				<div
					className="!bg-[rgb(23,51,52)] text-center align-middle"
					style={{
						width: '37.6875rem',
						height: '36.375rem',
						marginTop: '1.5rem',
						borderRadius: '0.935rem',
					}}
				>
					<div className="p-8 text-center">
						<img
							className="mx-auto rounded-full bg-offwhite"
							style={{
								height: '7.4375rem',
								width: '7.4375rem',
							}}
							src="/src/assets/sumbol.png"
							alt=""
						/>
						<span style={{ color: 'var(--Offwhite, #FFF)' }}>
							<div
								style={{
									textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									fontSize: '3.125rem',
									fontWeight: 800,
								}}
							>
								Manach
							</div>
							<span style={{ fontSize: '0.875rem', fontWeight: 400 }}>
								Store Management App
							</span>
						</span>
					</div>

					{/* Form input  */}
					<div className="form-login">
						<div className="mx-auto w-5/6 space-y-4"
						>
							<label className="mx-12 flex items-center gap-2 rounded-full border-2 border-[rgba(255,255,255,0.8)] px-8 py-4 text-center">

								<i className="fa fa-user text-[2rem] text-white"></i>
								<input
									type="text"
									style={{
										color: 'var(--Offwhite, #FFF)',
										fontSize: '1.25rem',
										fontWeight: 600,
									}}
									className="h-[2.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
									placeholder="Username"
									onChange={(e) => {
										setUsername(e.target.value)
									}}
								/>
							</label>
							<label className="mx-12 flex items-center gap-2 rounded-full border-2 border-[rgba(255,255,255,0.8)] px-8 py-4 text-center">

								<i className="fa fa-key text-[2rem] text-white"></i>
								<input
									type="password"
									style={{
										color: 'var(--Offwhite, #FFF)',
										fontSize: '1.25rem',
										fontWeight: 600,
									}}
									className="h-[2.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
									placeholder="Password"
									onChange={(e) => {
										setPassword(e.target.value)
									}}
								/>
							</label>
						</div>
					</div>


					<div className="mt-10 space-y-10 px-44" onClick={handleLogin}>
						<NavLink className="border z-50 bg-[rgb(66,107,31)] px-12 py-5 text-[1.5rem] font-bold text-[rgb(255,255,255)] border-[rgb(66,107,31)] rounded-full">
							Login
						</NavLink>
					</div>

				</div>
			</div>
		</div>
	)



}

export default Login

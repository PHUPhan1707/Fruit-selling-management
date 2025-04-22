import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userThunk } from '../../redux/userReducer/userThunk'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogin = () => {
		// Reset error message
		setError('')

		// Validate inputs
		if (!email || !password) {
			setError('Email and password are required')
			return
		}

		const data = {
			email: email,
			password: password,
		}

		dispatch(userThunk(data))
			.then((res) => {
				// Kiểm tra xem login có thành công không
				if (res.type === 'userReducer/loginThunk/fulfilled' && res.payload) {
					console.log(res.payload)
					if (res.payload.role_id == 2) {
						navigate('/customer/home')
					} else {
						navigate('/admin/home')
					}
				} else {
					setError(res.payload || 'Login failed. Please check your credentials.')
				}
			})
			.catch((err) => {
				console.log(err)
				setError('Login failed. Please check your credentials.')
			})

	}

	return (
		<div className="flex justify-center items-center  h-screen bg-gray-100">
			<div className="flex bg-[rgb(255,255,255)] shadow-lg rounded-lg overflow-hidden w-[70rem] h-[35rem]">
				<div className="w-2/3 bg-cover bg-center"
					style={{ backgroundImage: "url('/src/assets/bg-login.png')" }}></div>

				<div className="w-1/2 p-8 flex flex-col justify-center bg-white text-green-900 z-10">


					<div className="text-center">
						<img className="mx-auto rounded-full" src="/src/assets/sumbol.png" alt="Logo" width="80" />
						<h1 className="text-3xl font-bold mt-2">Manach</h1>
						<p className="text-sm">Store Management App</p>
					</div>

					{/* Form nhập liệu */}
					<div className="mt-6 space-y-4">
						<div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
							<i className="fa fa-envelope text-lg text-green-900"></i>
							<input
								type="email"
								className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex items-center border border-[rgb(70,255,91)] rounded-md bg-green-100 px-4 py-3">
							<i className="fa fa-key text-lg text-green-900"></i>
							<input
								type="password"
								className="bg-transparent w-full text-green-900 text-lg outline-none pl-4"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						{/* Error message */}
						{error && (
							<div className="text-red-500 text-sm text-center">
								{error}
							</div>
						)}
					</div>

					{/* Nút đăng nhập */}
					<div className="mt-6 text-center">
						<button
							className="bg-green-600 w-full py-3 rounded-md text-white text-lg font-bold hover:bg-green-700"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
					{/* Quên mật khẩu */}
					<div className="mt-4 text-center">
						<NavLink to="/auth/forgot-password" className="text-green-900 underline">
							Forgot Password?
						</NavLink>
					</div>

					{/* Quay lại */}
					<div className="mt-4 text-center">
						<NavLink to="/auth/welcome" className="text-green-900 ">
							Back
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login

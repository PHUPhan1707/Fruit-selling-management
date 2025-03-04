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
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[70rem] h-[35rem]">
				<div className="w-2/3 bg-cover bg-center" 
					style={{ backgroundImage: "url('/src/assets/bg-login.png')" }}>
					 
				</div>
				
				<div className="w-1/2 p-8 flex flex-col justify-center bg-[rgb(255,255,255)] text-white">
					<div className="text-center">
						<img className="mx-auto rounded-full" src="/src/assets/sumbol.png" alt="Logo" width="80" />
						<h1 className="text-3xl font-bold mt-2">Manach</h1>
						<p className="text-sm">Store Management App</p>
					</div>

					{/* Form nhập liệu */}
					<div className="mt-6 space-y-4">
						<div className="flex items-center border-2 border-white rounded-full px-4 py-3">
							<i className="fa fa-user text-lg"></i>
							<input
								type="text"
								className="bg-transparent w-full text-white text-lg outline-none pl-4"
								placeholder="Username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="flex items-center border-2 border-white rounded-full px-4 py-3">
							<i className="fa fa-key text-lg"></i>
							<input
								type="password"
								className="bg-transparent w-full text-white text-lg outline-none pl-4"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					{/* Nút đăng nhập */}
					<div className="mt-6 text-center">
						<button
							className="bg-green-600 w-full py-3 rounded-full text-white text-lg font-bold hover:bg-green-700"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>

					{/* Quay lại */}
					<div className="mt-4 text-center">
						<NavLink to="/auth/welcome" className="text-white underline">
							Back
						</NavLink>
					</div>
				</div>

				
				
			</div>
		</div>
	)
}

export default Login

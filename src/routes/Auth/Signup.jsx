import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { postSignUp } from '../../redux/userReducer/userThunk'

const Signup = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			password: '',
			email: '',
			payment: '',
			phone: '',
		},
		validationSchema: yup.object().shape({
			name: yup.string().required('Name is required'),
			username: yup.string().required('Username is required'),
			password: yup
				.string()
				.required('Password is required')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					'8 characters, upper, number, and special case',
				),
			email: yup
				.string()
				.email('Invalid email address')
				.required('Email is required'),
			payment: yup
				.string()
				.required('Payment information is required')
				.matches(/^[a-zA-Z]+-\d+$/, 'Payment must be in the format word-123'),
			phone: yup
				.string()
				.required('Phone number is required')
				.matches(/^\d{9,10}$/, 'Phone number must be exactly 9 digits'),
		}),

		onSubmit: (values) => {
			const data = {
				full_name: values.name,
				address: '123 Govap',
				user_name: values.username,
				bank_account: values.payment,
				user_password: values.password,
				phone: values.phone,
				email: values.email,
			}
			dispatch(postSignUp(data))
			navigate('/auth/welcome')
		},
	})

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[70rem] h-[35rem]">
				{/* Hình nền bên trái */}
				<div className="w-2/3 bg-cover bg-center" 
					style={{ backgroundImage: "url('/src/assets/bg-login.png')" }}>
				</div>

				{/* Nội dung đăng ký bên phải */}
				<div className="w-1/2 p-8 flex flex-col justify-center bg-[rgb(255,255,255)] text-white">
					{/* <div className="text-center">
						<img className="mx-auto rounded-full" src="/src/assets/sumbol.png" alt="Logo" width="80" />
						<h1 className="text-3xl font-bold mt-2">Manach</h1>
						<p className="text-sm">Store Management App</p>
					</div> */}


					{/* Form input  */}
					<form onSubmit={formik.handleSubmit} className="form-login mt-4">
						<div className="flex text-left">
							<div className="mx-auto w-5/6 space-y-4">
								<div className="mx-12 text-left">
									<span
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: 300,
										}}
									>
										Name
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="text"
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="name"
											
										className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your username"
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
									</label>
	 
									{formik.errors.name && formik.touched.name && (
										<p className="text-red-500">{formik.errors.name}</p>
									)}
								</div>
								<div className="mx-12 text-left">
									<span
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: 300,
										}}
									>
										Username
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="text" 
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="username"
											className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your username"
											onChange={formik.handleChange}
											value={formik.values.username}
										/>
									</label>
									{formik.errors.username && formik.touched.username && (
										<p className="text-red-500">{formik.errors.username}</p>
									)}
								</div>
								<div className="mx-12 text-left">
									<span
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: 300,
										}}
									>
										Password
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="password"
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="password"
											className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your password"
											onChange={formik.handleChange}
											value={formik.values.password}
										/>
									</label>
									{formik.errors.password && formik.touched.password && (
										<p className="text-red-500">{formik.errors.password}</p>
									)}
								</div>
								<div className="mx-12 text-left">
									<span
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: 300,
										}}
									>
										Email
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="email"
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="email"
											className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your email"
											onChange={formik.handleChange}
											value={formik.values.email}
										/>
									</label>
									{formik.errors.email && formik.touched.email && (
										<p className="text-red-500">{formik.errors.email}</p>
									)}
								</div>
								<div className="mx-12 text-left">
									<span
									style={{
										color: 'black',
										fontSize: '1rem',
										fontWeight: 300,
									}}
									>
										Payment
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="text"
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="payment"
											className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your payment"
											onChange={formik.handleChange}
											value={formik.values.payment}
										/>
									</label>
									{formik.errors.payment && formik.touched.payment && (
										<p className="text-red-500">{formik.errors.payment}</p>
									)}
								</div>
								<div className="mx-12 text-left">
									<span
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: 300,
										}}
									>
										Phone
									</span>
									<label className=" flex w-50 items-center rounded-full border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
										<input
											type="text"
											style={{
												color: 'black',
												fontSize: '1rem',
												fontWeight: 300,
											}}
											name="phone"
											className="h-[1.5rem] grow bg-transparent text-center text-[1.5rem] text-white outline-none placeholder-white"
											placeholder="Enter your phone"
											onChange={formik.handleChange}
											value={formik.values.phone}
										/>
									</label>
									{formik.errors.phone && formik.touched.phone && (
										<p className="text-red-500">{formik.errors.phone}</p>
									)}
								</div>
							</div>
						</div>

						<div className="mt-6 space-y-10 px-44">
							<button
								type="submit"
								className="rounded-xl bg-green_light1 px-12 py-3 text-[1.5rem] font-bold text-green_dark1"
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Signup

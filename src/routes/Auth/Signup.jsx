import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { postSignUp } from '../../redux/userReducer/userThunk'
import { useState, useRef, useEffect } from 'react'
import { message } from 'antd'
import { userService } from '../../service/userService'

const Signup = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [submitted, setSubmitted] = useState(false)
	const [showVerify, setShowVerify] = useState(false)
	const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', ''])
	const [verifyLoading, setVerifyLoading] = useState(false)
	const [verifyError, setVerifyError] = useState('')
	const inputRefs = useRef([])
	const [registeredEmail, setRegisteredEmail] = useState('')

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
				password: values.password,
				phone: values.phone,
				email: values.email,
			}
			dispatch(postSignUp(data))
				.then(() => {
					setRegisteredEmail(values.email)
					setShowVerify(true)
					message.success('Registration successful! Please verify your email.')
				})
				.catch((err) => {
					console.error(err)
					message.error(err.response?.data?.message || 'Signup failed')
				})
		},
	})

	const handleVerifyChange = (index, value) => {
		const newCode = [...verifyCode]

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split('')
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || ''
			}
			setVerifyCode(newCode)

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '')
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
			inputRefs.current[focusIndex].focus()
		} else {
			if (/^\d*$/.test(value)) {
				newCode[index] = value
				setVerifyCode(newCode)

				if (value && index < 5) {
					inputRefs.current[index + 1].focus()
				}
			}
		}
	}

	const handleVerifyKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !verifyCode[index] && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}

	const handleVerifySubmit = async (e) => {
		if (e) e.preventDefault()

		const code = verifyCode.join('')
		if (code.length !== 6) {
			setVerifyError('Please enter all 6 digits')
			return
		}

		setVerifyLoading(true)
		setVerifyError('')

		try {
			const response = await userService.verifyEmail(code)
			if (response.data && response.data.message === "success") {
				message.success('Email verified successfully!')
				navigate('/auth/login')
			} else {
				setVerifyError('Invalid verification code')
			}
		} catch (err) {
			console.error('Verification error:', err)
			setVerifyError(err.response?.data?.message || 'Verification failed')
		} finally {
			setVerifyLoading(false)
		}
	}

	useEffect(() => {
		if (verifyCode.every(digit => digit !== '') && verifyCode.join('').length === 6) {
			handleVerifySubmit()
		}
	}, [verifyCode])

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[70rem] h-[35rem]">

				<div className="w-2/3 bg-cover bg-center"
					style={{ backgroundImage: "url('/src/assets/bg-login.png')" }}>
				</div>

				<div className="w-1/2 p-8 flex flex-col justify-center bg-[rgb(255,255,255)] text-white">
					{showVerify ? (
						<div className="mt-6">
							<div className="text-center mb-6">
								<img className="mx-auto rounded-full" src="/src/assets/sumbol.png" alt="Logo" width="80" />
								<h1 className="text-3xl font-bold mt-2" style={{ color: 'black' }}>Verify Email</h1>
								<p className="text-sm" style={{ color: 'black' }}>
									We've sent a verification code to your email.<br />
									Please enter the 6-digit code below.
								</p>
							</div>

							<div className="flex justify-between mb-4 space-x-2 px-12">
								{verifyCode.map((digit, index) => (
									<input
										key={index}
										ref={(el) => (inputRefs.current[index] = el)}
										type="text"
										maxLength="1"
										value={digit}
										onChange={(e) => handleVerifyChange(index, e.target.value)}
										onKeyDown={(e) => handleVerifyKeyDown(index, e)}
										className="w-11 h-12 text-center text-xl font-bold border-2 border-green-200 rounded-md focus:border-green-500 focus:outline-none"
										style={{ color: 'black' }}
									/>
								))}
							</div>

							{verifyError && (
								<div className="text-red-500 text-sm text-center mb-4">
									{verifyError}
								</div>
							)}

							<div className="mt-6 space-y-4 px-44">
								<button
									onClick={handleVerifySubmit}
									disabled={verifyLoading}
									className="rounded-xl bg-green_light1 px-12 py-3 text-[1.5rem] font-bold text-green_dark1"
								>
									{verifyLoading ? 'Verifying...' : 'Verify'}
								</button>

								<div className="text-center">
									<button
										type="button"
										onClick={() => navigate('/auth/login')}
										className="text-green-700"
										style={{ color: 'black' }}
									>
										Skip for now
									</button>
								</div>
							</div>
						</div>
					) : (
						<form onSubmit={formik.handleSubmit} className="form-login mt-4">
							<div className="flex text-left">
								<div className="mx-auto w-5/6 space-y-4">
									<div className="mx-12 text-left">
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
											<input
												type="username"
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
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
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
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
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
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
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
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
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
										<label className="flex w-50 items-center rounded-md border-2 border-[rgba(103,255,90,0.8)] px-2 py-1 text-center">
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
					)}
				</div>
			</div>
		</div>
	)
}

export default Signup

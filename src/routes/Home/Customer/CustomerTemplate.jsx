import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../../../components/Header/Header'
import { useSelector } from 'react-redux';

const CustomerTemplate = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	const { roleName } = useSelector(
		(state) => state.userReducer,
	)
	return (
		<div>
			<Header roleName={roleName} />
			<Outlet />
		</div>
	)
}

export default CustomerTemplate

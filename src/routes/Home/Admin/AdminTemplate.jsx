import { Outlet } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import { useSelector } from 'react-redux';

const AdminTemplate = () => {
	const { roleName} = useSelector(
			(state) => state.userReducer,
		)
	return (
		<div>
			<Header roleName={roleName} />
			<Outlet />
		</div>
	)
}

export default AdminTemplate

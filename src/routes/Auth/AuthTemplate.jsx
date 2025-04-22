// import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import NeedHelps from '../../components/needHelps/needHelps'

const AuthTemplate = () => {
	return (
		<div className="flex">
			<div 
			>
				<div className="absolute bottom-0">
					<NeedHelps />
				</div>
			</div>
			<div className="flex-1 flex justify-center absolute items-center min-h-screen w-full"
			    style={{	
					backgroundImage: 'url(/src/assets/background_login.jpg)',
					backgroundPosition: 'center',  
					backgroundRepeat: 'no-repeat', 
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed', 
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center', 
					zIndex: -1,  
				}}
				>				
				<Outlet />
			</div>
		</div>
	)
}

export default AuthTemplate

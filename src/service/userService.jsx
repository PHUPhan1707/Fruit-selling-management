import { http } from './urlConfig'

export const userService = {
	postLogin: (data) => {
		let url = '/auth/login'
		return http.post(url, data)
	},
	postSignUp: (data) => {
		let url = '/auth/signup'
		return http.post(url, data)
	},

	getInfor: (data) => {
		let url = `/user/${data}`
		return http.get(url)
	},
	editProfile: (id, infor) => {
		let url = `/user/${id}/edit`
		console.log('infor:', infor)
		console.log('url:', url)
		return http.put(url, infor)
	},

	updatePassword: (id, passwordData) => {
		let url = `/user/${id}/password`;
		return http.put(url, {
			currentPassword: passwordData.currentPassword,
			newPassword: passwordData.newPassword,
		});
	},
}

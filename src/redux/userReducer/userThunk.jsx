import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { userService } from '../../service/userService'

export const userThunk = createAsyncThunk(
	'userReducer/loginThunk',
	async (payload) => {
		try {
			const data = await userService.postLogin(payload)
			message.success('Login succes')

			return data.data.content
		} catch (error) {
			message.success('Login fail')
		}
	},
)
export const getInfor = createAsyncThunk(
	'userReducer/getInfor',
	async (payload) => {
		try {
			const data = await userService.getInfor(payload)
			return data
		} catch (error) {
			console.log('error:', error)
		}
	},
)
export const editProfile = createAsyncThunk(
	'userReducer/editProfile',
	async (payload) => {
		try {
			const data = await userService.editProfile(payload.id, payload.infor)
			message.success('Change success')
			return data
		} catch (error) {
			console.log('error:', error)
		}
	},
)
export const postSignUp = createAsyncThunk(
	'userReducer/signup',
	async (payload) => {
		try {
			const data = await userService.postSignUp(payload)
			message.success('Create Account Success')
			return data
		} catch (error) {
			console.log('error:', error)
		}
	},
)

export const updatePassword = (data) => async (dispatch) => {
	try {
	  const response = await axios.put(`http://localhost:8080/users/${data.id}/password/`, {
		currentPassword: data.currentPassword,
		newPassword: data.newPassword,
	  });
	  return response.data;
	} catch (error) {
	  throw error.response.data;
	}
  };

import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { userService } from '../../service/userService'

export const userThunk = createAsyncThunk(
	'userReducer/loginThunk',
	async (payload, { rejectWithValue }) => {
		try {
			// Validate input data
			if (!payload.email || !payload.password) {
				message.error('Email and password are required')
				return rejectWithValue('Email and password are required')
			}

			const response = await userService.postLogin(payload)

			// Check if response is valid
			if (!response.data || !response.data.content) {
				message.error('Invalid server response')
				return rejectWithValue('Invalid server response')
			}

			message.success('Login success')
			return response.data.content
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Login failed'
			message.error(errorMessage)
			return rejectWithValue(errorMessage)
		}
	},
)
export const getInfor = createAsyncThunk(
	'userReducer/getInfor',
	async (payload, { rejectWithValue }) => {
		try {
			const data = await userService.getInfor(payload)
			return data
		} catch (error) {
			console.log('error:', error)
			return rejectWithValue(error.response?.data || 'Failed to get information')
		}
	},
)
export const editProfile = createAsyncThunk(
	'userReducer/editProfile',
	async (payload, { rejectWithValue }) => {
		try {
			const data = await userService.editProfile(payload.id, payload.infor)
			message.success('Change success')
			return data
		} catch (error) {
			console.log('error:', error)
			return rejectWithValue(error.response?.data || 'Failed to edit profile')
		}
	},
)
export const postSignUp = createAsyncThunk(
	'userReducer/signup',
	async (payload, { rejectWithValue }) => {
		try {
			const data = await userService.postSignUp(payload)
			message.success('Create Account Success')
			return data
		} catch (error) {
			console.log('error:', error)
			message.error(error.response?.data?.message || 'Signup failed')
			return rejectWithValue(error.response?.data || 'Signup failed')
		}
	},
)

import { createSlice } from '@reduxjs/toolkit'
import { editProfile, getInfor, postSignUp, userThunk } from './userThunk'
import { userLocal } from '../../service/userLocal'
import { decodeJWT } from '../../utils/jwtUtils'

const initialState = {
	userId: userLocal.getUserId(),
	roleId: 2,
	roleName: userLocal.getRoleName(),
	inforUser: [],
}

const userReducer = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		logOutAction: (state) => {
			state.userId = null
			state.roleName = null
			state.roleId = null

			localStorage.removeItem('token')
			userLocal.delete()
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userThunk.fulfilled, (state, action) => {
				const tokenData = decodeJWT(action.payload);
				if (tokenData && tokenData.data) {
					const { user_id, role_id } = tokenData.data;
					userLocal.setId(user_id);
					userLocal.setRoleName(role_id);
					localStorage.setItem('roleId', role_id);
					state.userId = user_id;
					state.roleId = role_id;
					state.roleName = userLocal.getRoleName();
				}
			})
			.addCase(getInfor.fulfilled, (state, action) => {
				let data = action.payload.data.content
				userLocal.setInfor(data)
				state.inforUser = data
			})
			.addCase(editProfile.fulfilled, (state, action) => {
				console.log('.addCase ~ action:', action.payload.data.content)
				const data = action.payload.data.content
				state.inforUser = data
			})
			.addCase(postSignUp.fulfilled, (state, action) => {
				console.log(action.payload)
			})
	},
})

export const { logOutAction } = userReducer.actions

export default userReducer.reducer

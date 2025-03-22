import { createAsyncThunk } from '@reduxjs/toolkit'
import { dashboardService } from '../../service/dashboardService'
import { message } from 'antd'

export const dashboardThunk = createAsyncThunk('dashboardThunk', async (_, { rejectWithValue }) => {
    try {
        const response = await dashboardService.getDashBoard()
        console.log('dashboardThunk ~ response:', response)
        message.success('Load success')
        return response.data // Return { status: "Success", data: {...} }
    } catch (error) {
        message.error('Failed to load dashboard data')
        return rejectWithValue(error.response?.data || error.message)
    }
})
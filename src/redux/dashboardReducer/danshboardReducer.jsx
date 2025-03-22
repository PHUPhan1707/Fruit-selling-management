import { createSlice } from '@reduxjs/toolkit'
import { dashboardThunk } from './dashboardThunk'

const initialState = {
    data: {
        revenue: 0,
        orderVolume: 0,
        productionVolume: 0,
        cost: 0,
        bestSellingProducts: [],
        productDistribution: { productInWarehouse: 0, productOnShelf: 0, productSold: 0 },
        warehouseActivities: { incoming: 0, outgoing: 0 }, // Adjusted to match backend
        customers: 0,
        weeklyOrders: [],
        weeklyRevenue: [],
    },
    loading: false,
    error: null,
}

const dashboardReducer = createSlice({
    name: 'dashboardReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dashboardThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(dashboardThunk.fulfilled, (state, action) => {
                state.loading = false
                state.data = {
                    ...state.data, // Preserve defaults
                    ...action.payload.data // Merge actual data
                }
            })
            .addCase(dashboardThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default dashboardReducer.reducer
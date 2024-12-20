import { configureStore } from '@reduxjs/toolkit'
import addressSlice from './addressSlice'

const store = configureStore({
    reducer: {
        addressSlice: addressSlice,
    }
})

export default store
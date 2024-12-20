import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 非同期処理を定義 (createAsyncThunk を使用)
export const fetchAddress = createAsyncThunk(
    'addressSlice/fetchAddress', // アクションタイプ
    async (zipcode, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:4000/zip?zipcode=${zipcode.zipcode}`);

            // 正常に取得できなかった場合
            if(!response.data.results){
                return rejectWithValue(response.data.message || 'Unknown error occurred');
            }
            const selectAddress = response.data.results[0];
            return {
                address1: selectAddress.address1,
                address2: selectAddress.address2,
                address3: selectAddress.address3,
            };
        } catch (error) {
            console.error('Error fetching address:', error.message);
            return rejectWithValue(error.message); // エラーを管理するために rejectWithValue を使用
        }
    }
);

// スライスを定義
export const addressSlice = createSlice({
    name: 'addressSlice',
    initialState: {
        address: {
            address1: '',
            address2: '',
            address3: '',
        },
        loading: false, // ローディング状態
        error: null, // エラー情報
    },
    reducers: {
        // 同期的な処理が必要な場合はここに記述
    },
    extraReducers: (builder) => {
        builder
            // 非同期処理 開始時
            .addCase(fetchAddress.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            // 非同期処理 成功時
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            // 非同期処理 失敗時
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.address = {
                    address1: '',
                    address2: '',
                    address3: '',
                }
            });
    },
});

export default addressSlice.reducer;

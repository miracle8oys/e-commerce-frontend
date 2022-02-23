import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {login} from "../service/authService";

export const loginSlice = createAsyncThunk(
  'auth/Login', 
  () => {
      const response = login();
      return response
  }
)

const initialState = {
  value: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.value = null
    },
  },
  extraReducers: (snapshot) => {
    snapshot
      .addCase(loginSlice.fulfilled, (state, action) => {
          state.value = action.payload
      })
      .addCase(loginSlice.rejected, (state, action) => {
          state.value = action.payload
      })
}
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer
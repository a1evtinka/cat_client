import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const initialState = {
  users: [],
  genders: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('/users/fetchUsers', () =>
  fetch('/api/users').then((res) => res.json()),
);

export const fetchGenders = createAsyncThunk('/users/fetchGenders', () =>
  fetch('/api/genders').then((res) => res.json()),
);

const usersSlice = createSlice({
  name: 'fetchUsers',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;      
    });
    builder.addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
    });
  },
});
export const selectUsers = (state) => state.users.users;
export const selectGenders = (state) => state.users.genders;
// export const { getOption } = eventOptionsSlice.actions;
export default usersSlice.reducer;

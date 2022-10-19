import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  error: '',
};

export const fetchCountries = createAsyncThunk('/countries/fetchCountries', () =>
  fetch('/api/countries').then((res) => res.json()),
);

const cointriesSlice = createSlice({
  name: 'fetchCountries',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;      
    });
  },
});

export const selectCountries = (state) => state.countries;
// export const { getOption } = eventOptionsSlice.actions;
export default cointriesSlice.reducer;

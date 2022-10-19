import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  apartTypes: [],
  error: '',
};

export const putApartTypes = createAsyncThunk(
  'apartTypes/putApartTypes',
  async (data, { rejectWithValue }) =>{
  console.log("🚀 ~ file: apartsSlice.js ~ line 13 ~ data", data)

  const res = await axios({
    method: 'post',
    url: '/api/apartsTypes/add',
    data: data,
  }) .catch(error => {
    console.log(error);
  });

  }
)

export const editApTypes = createAsyncThunk(
  'apartTypes/editApTypes',
  async(data, { rejectWithValue }) => {
  console.log("🚀 ~ file: aparttypesSlice.js ~ line 28 ~ async ~ data", data)
    
  const res = await axios({
    method: 'put',
    url: '/api/apartsTypes/put',
    data: data,
  }) .catch(error => {
    console.log(error);
  });
  }
)



export const fetchApartTypes = createAsyncThunk('/apartsTypes/fetchApartTypes', () =>
  fetch('/api/apartsTypes').then((res) => res.json()),
);
export const fetchApartTypesWithVotes = createAsyncThunk('/apartsTypesWithVotes/apartsTypesWithVotes', (id) => 
  fetch(`/api/apartsTypes/${id}/votes`).then((res) => res.json())
);
export const addApartTypeVotesFetch = createAsyncThunk(
  '/api/apartsTypes/add',
  async (data) => await axios.post(`/api/apartsTypes/${data.eventId}/votes`, {
      optionId: data.optionId,
      userId: data.userId,
      eventId: +data.eventId
  })) 

const aparttypesSlice = createSlice({
  name: 'apartTypes',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
    // Добавление голоса из модалки в редьюсер и в базу
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApartTypes.fulfilled, (state, action) => {
      state.apartTypes = action.payload;
    });
    builder.addCase(fetchApartTypesWithVotes.fulfilled, (state, action) => { 
      const allVotes = action.payload.reduce((acc, curr) => acc + curr.ApartsTypesVotes.length, 0);
      const options = action.payload.map((el) => ({...el, votes: el.ApartsTypesVotes.length}))
      state.apartTypes = options;  
      state.votes = allVotes;  
      // state.eventOptions.map((option) => option.id === action.payload.id
    });
    builder.addCase(addApartTypeVotesFetch.fulfilled, (state, action) => {
      console.log(action.payload, 'oooo');
      const allVotes = action.payload.data.reduce((acc, curr) => acc + curr.ApartsTypesVotes.length, 0);
      const options = action.payload.data.map((el) => ({ ...el, votes: el.ApartsTypesVotes.length }));
      state.apartTypes = options;
      state.votes = allVotes;
    })
  },
});
export const selectApartTypes = (state) => state.aparttypes.apartTypes;
export const selectApartTypesVotes = (state) => state.aparttypes.votes;
export const selectApartTypesWithVotes = (state) => state.aparttypes.apartTypes;
// export const { getOption } = eventOptionsSlice.actions;
export default aparttypesSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  aparts: [],
  error: '',
};


export const putApart = createAsyncThunk(
  'aparts/putApart',
  async (data, { rejectWithValue }) =>{
  // console.log("🚀 ~ file: apartsSlice.js ~ line 13 ~ data", data)
    
  const res = await axios({
    method: 'post',
    url: '/api/aparts/add',
    data: data,
  }) .catch(error => {
    console.log(error);
  });

  }
)

export const editApart = createAsyncThunk(
  'aparts/editApart',
  async (data, { rejectWithValue }) =>{
  console.log("🚀 ~ file: apartsSlice.js ~ line 29 ~ data", data)
    
  const res = await axios({
    method: 'put',
    url: '/api/aparts/put',
    data: data,
  }) .catch(error => {
    console.log(error);
  });

  }
)

export const fetchAparts = createAsyncThunk('/aparts/fetchAparts', () =>
  fetch('/api/aparts').then((res) => res.json()),
);
export const fetchApartsWithVotes = createAsyncThunk('/apartsWithVotes/fetchApartsWithVotes', (id) => 
  fetch(`/api/aparts/${id}/votes`).then((res) => res.json())
);
export const addApartsVotesFetch = createAsyncThunk(
  '/api/aparts/add',
  async (data) => await axios.post(`/api/aparts/${data.eventId}/votes`, {
      optionId: data.optionId,
      userId: data.userId,
      eventId: +data.eventId
  })) 


const apartsSlice = createSlice({
  name: 'aparts',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
    // Добавление голоса из модалки в редьюсер и в базу
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAparts.fulfilled, (state, action) => {
      state.aparts = action.payload;
    });
    builder.addCase(fetchApartsWithVotes.fulfilled, (state, action) => { 
      const allVotes = action.payload.reduce((acc, curr) => acc + curr.ApartsVotes.length, 0);
      const options = action.payload.map((el) => ({...el, votes: el.ApartsVotes.length}))
      state.aparts = options;  
      state.votes = allVotes;  
      // state.eventOptions.map((option) => option.id === action.payload.id
    });
    builder.addCase(addApartsVotesFetch.fulfilled, (state, action) => {
      console.log(action.payload, 'oooo');
      const allVotes = action.payload.data.reduce((acc, curr) => acc + curr.ApartsVotes.length, 0);
      const options = action.payload.data.map((el) => ({ ...el, votes: el.ApartsVotes.length }));
      state.aparts = options;
      state.votes = allVotes;
    })
  },
});
export const { addApartsVote } = apartsSlice.actions;
export const selectAparts = (state) => state.aparts.aparts;
export const selectApartsVotes = (state) => state.aparts.votes;
export const selectApartsWithVotes = (state) => state.aparts.aparts;
// export const { getOption } = eventOptionsSlice.actions;
export default apartsSlice.reducer;

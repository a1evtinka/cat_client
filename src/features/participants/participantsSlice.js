import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  participants: [],
}

export const getParticipants = createAsyncThunk(
  'participants/getParticipants',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/api/participants') // тут запрос к бд по евентам все робит)
    console.log( 'getParticipants');
    dispatch(setParticipants(res.data))
  }
)

export const addParticipant = createAsyncThunk(
  'participants/addParticipants',
  async (data, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`/api/participants/`, data) // тут запрос к бд по евентам все робит)
    dispatch(setParticipants(res.data))
  }
)

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers:{
    setParticipants: (state, action) => {
      state.participants = [...action.payload]
    },
  },
  extraReducers:{
    // [getParticipants.fulfilled]:() => console.log('fullfilled'),
    // [getParticipants.pending]:() => console.log('pending'),
    // [getParticipants.rejected]:() => console.log('rejected'),
  },
})

export const { setParticipants } = participantsSlice.actions
export const selectParticipants = (state) => state.participant.participants;
export default participantsSlice.reducer
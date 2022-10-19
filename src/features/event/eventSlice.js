import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  events: [],
}

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/api/events') // тут запрос к бд по евентам все робит)
    dispatch(setEvent(res.data))
  }
)

export const setTimer = createAsyncThunk(
  'event/setTimer',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/api/events') // тут запрос к бд по евентам все робит)

    dispatch(addTimer())
  }
)

export const setRound = createAsyncThunk('/events/setRound', async ({id, round}) =>
  await axios.put(`/api/events/changeRound`, {id, round})
  // console.log('llll')
  
);


// это от Али через экстра редьюсер

// export const getEvent = createAsyncThunk('/event/getEvent', () => 
//   fetch('/api/events').then((res) => res.json())
// );


export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers:{
    setEvent: (state, action) => {
      state.events = [...action.payload]
    },
    addTimer: (state, action) => {
      state.events.find((event))
    }
  },
  // extraReducers:{
  //   [getEvent.fulfilled]:() => console.log('fullfilled'),
  //   [getEvent.pending]:() => console.log('pending'),
  //   [getEvent.rejected]:() => console.log('rejected'),
  // },putApart
  extraReducers: (builder) => {
    builder
      .addCase(setRound.fulfilled, (state, action) => {
        console.log(action.payload, 'llll');
        console.log(state.events, 'eeeeee');
        state.events = state.events.map((event) => event.id === +action.payload.data.id
        ? {...event, round: action.payload.data.round} 
        : event);
      }) 
  },
})

export const { setEvent, addTimer, changeRound } = eventSlice.actions

export const selectEvents = (state) => state.event.events;

export default eventSlice.reducer
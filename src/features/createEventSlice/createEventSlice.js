import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
}

export const putEvent = createAsyncThunk(
  'cr8event/createAsyncThunk',
  async (data, { rejectWithValue }) => {
  // console.log("🚀 ~ file: createEventSlice.js ~ line 11 ~ data", data)
  if (!data.startDate.trim() 
  || !data.endDate.trim()
  || !data.maxParticipants
  || !data.eventTitle.trim()
  || !data.description.trim()
  || !data.userId
  || !data.statusId
   ) {
    throw new Error('Не все поля заполнены');
  }

  const res = await axios({
    method: 'post',
    url: '/api/events/add',
    data: data
  }) .catch(error => {
    console.log(error);
  });
  
  }
)

export const editEvent = createAsyncThunk(
  'cr8event/editEvent',
  async( data, {rejectWithValue}) => {
    console.log("🚀 ~ file: createEventSlice.js ~ line 37 ~ async ~ data", data)

    
    const res = await axios({
      method: 'put',
      url: '/api/events/put',
      data: data
    }) .catch(error => {
      console.log(error);
    });
  }

)


export const eventSlice = createSlice({
  name: 'cr8event',
  initialState,
  reducers:{
    setEvent: (state, action) => {
      state.events = [...action.payload]
    },
    getEvent: (state, action) => {

    },
  },
})

export const { setEvent } = eventSlice.actions

export default eventSlice.reducer
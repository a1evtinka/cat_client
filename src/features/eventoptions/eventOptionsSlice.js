import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  eventOptions: [],
  votes: '',
  error: '',
};



export const fetchEventOptions = createAsyncThunk('/eventOptions/fetchEventOptions', () =>
  fetch('/api/eventoptions').then((res) => res.json())
);

export const fetchOptionsWithVotes = createAsyncThunk(
  '/eventOptionsWithVotes/fetchEventOptionsWithVotes',
  (id) => fetch(`/api/eventOptions/${id}/votes`).then((res) => res.json())
);

export const addVotesFetch = createAsyncThunk(
  '/api/eventOptions/add',
  async (data) => await axios.post(`/api/eventOptions/${data.eventId}/votes`, {
      optionId: data.optionId,
      userId: data.userId,
      eventId: +data.eventId
  })) 


  export const eventOptionsSlice = createSlice({
  name: 'eventOptions',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
    // Добавление голоса из модалки в редьюсер и в базу
    // addVote: (state, action) => {
    //   const votedOption = state.eventOptions.find(
    //     (option) => option.id === action.payload.optionId,
    //   );
    //   fetch(`/api/eventOptions/${action.payload.optionId}/votes`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       optionId: action.payload.optionId,
    //       userId: action.payload.userId,
    //       eventId: +action.payload.eventId,
    //     }),
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventOptions.fulfilled, (state, action) => {
      state.eventOptions = action.payload;
    });
    builder.addCase(fetchOptionsWithVotes.fulfilled, (state, action) => {
      const allVotes = action.payload.reduce((acc, curr) => acc + curr.OptionVotes.length, 0);
      const options = action.payload.map((el) => ({ ...el, votes: el.OptionVotes.length }));
      state.eventOptions = options;
      state.votes = allVotes;
    })
    builder.addCase(addVotesFetch.fulfilled, (state, action) => {
      console.log(action.payload, 'oooo');
      const allVotes = action.payload.data.reduce((acc, curr) => acc + curr.OptionVotes.length, 0);
      const options = action.payload.data.map((el) => ({ ...el, votes: el.OptionVotes.length }));
      state.eventOptions = options;
      state.votes = allVotes;
    })
      // state.eventOptions.map((option) => option.id === action.payload.id
    }
})

// export const { addVote } = eventOptionsSlice.actions;
export const selectWinner = (state) => state.eventOptions.eventOptions.filter((el) => el.winner === true);
export const selectEventOptions = (state) => state.eventOptions.eventOptions;
export const selectAllVotesEventOptions = (state) => state.eventOptions.votes;
export const selectEventOptionsWithVotes = (state) => state.eventOptions.eventOptions;
// export const { getOption } = eventOptionsSlice.actions;
export default eventOptionsSlice.reducer;

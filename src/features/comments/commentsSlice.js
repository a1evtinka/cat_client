import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  commentsFormError: undefined,
};

// фетч на получение комментов
export const fetchGetComments = createAsyncThunk('/comments/fetchGetComments', (credentals) =>
  fetch(`/api/comments/${credentals}`).then((res) => res.json()),
);
// фетч на добавление коммента в базу
export const fetchAddComments = createAsyncThunk('/comments/fetchAddComments', async (credentals) => {
  if (credentals.description === '')  {
    throw new Error('Напишите комментарий');
  }
  
  const data = await fetch('/api/comments/add', {
    method: 'POST',
    body: JSON.stringify(credentals),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data.json()
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentsFormError: (state) => {
      state.commentsFormError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetComments.fulfilled, (state, action) => {
        state.comments = action.payload;      
      })
      .addCase(fetchAddComments.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.commentsFormError = undefined;
      })
      .addCase(fetchAddComments.rejected, (state, action) => {
        state.commentsFormError = action.error.message;
      });
  },
});

export const selectComments = (state) => state.comments;
export const selectCommentsFormError = (state) => state.comments.commentsFormError;
export const { resetCommentsFormError } = commentsSlice.actions;
export default commentsSlice.reducer;

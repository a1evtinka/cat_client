import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  firstName: '',
  lastName: '',
  photo: '',
  profession: '',
  birthday: '',
  genderId: '',
  countryId: '',
  city: '',
  interests: '',
};

export const fillProfileFields = createAsyncThunk(
  'profile/fillProfileFields',
  async (data, {
    rejectWithValue,
  }) => {
    console.log(data, 'мы с датой перед запросом на бэк');
    const res = await axios.put(`/api/users/${data.id}/edit`, data).then(data => console.log(data))
  })


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      if (action.payload.firstName !== undefined) {
        state.firstName = action.payload.firstName;
      }
      if (action.payload.lastName !== undefined) {
        state.lastName = action.payload.lastName;
      }
      if (action.payload.profession !== undefined) {
        state.profession = action.payload.profession;
      }
      if (action.payload.birthday !== undefined) {
        state.birthday = action.payload.birthday;
      }
      if (action.payload.genderId !== undefined) {
        state.genderId = action.payload.genderId;
      }
      if (action.payload.countryId !== undefined) {
        state.countryId = action.payload.countryId;
      }
      if (action.payload.city !== undefined) {
        state.city = action.payload.city;
      }
      if (action.payload.interests !== undefined) {
        state.interests = action.payload.interests;
      }
    },
  }
});

export const {
  setProfile,
  removeProfile,
  setPhoto
} = profileSlice.actions;

export default profileSlice.reducer;

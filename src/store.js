import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import eventSlice from './features/event/eventSlice';
import eventOptionsSlice from './features/eventoptions/eventOptionsSlice';
import participantsSlice from './features/participants/participantsSlice';
import profileSliceReducer from './features/profile/profileSlice';
import usersSlice from './features/users/usersSlice';
import countriesSlice from './features/countries/countriesSlice';
import commentsSlice from './features/comments/commentsSlice';
import aparttypesSlice from './features/aparttypes/aparttypesSlice';
import apartsSlice from './features/apartsSlice/apartsSlice';


export default configureStore({
  reducer: {
    auth: authSlice,
    eventOptions: eventOptionsSlice,
    event: eventSlice,
    user: profileSliceReducer,
    users: usersSlice,
    participant: participantsSlice,
    countries: countriesSlice,
    comments: commentsSlice,
    aparttypes: aparttypesSlice,
    aparts: apartsSlice,
  },
});

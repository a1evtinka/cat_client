import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
import Main from '../features/main/Main';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
// import { getUser, selectAuthChecked } from '../features/auth/authSlice';
import Layout from '../components/Layout';

import VoteComponent from '../components/VoteComponent';
// import ChartComponent from '../components/ChartComponent';
// import AllEvents from '../components/pages/AllEvents';
import Event from '../components/event/Event';
import Profile from '../components/pages/Profile';
import Usersprofile from '../components/profile/Usersprofile';
import PayPage from '../components/pay/PayPage'
import { fetchEventOptions } from '../features/eventoptions/eventOptionsSlice';
import { getEvent, setEvent } from '../features/event/eventSlice';
import { useDispatch } from 'react-redux';
import { fetchGenders, fetchUsers } from '../features/users/usersSlice';
import CreateEvent from '../components/createEvent/CreateEventForm';
import EventForm from '../components/createEvent/CreateEventForm';
import { fetchCountries } from '../features/countries/countriesSlice';
import { getUser } from '../features/auth/authSlice';
import EventPage from '../components/pages/EventPage';
import { getParticipants } from '../features/participants/participantsSlice';
import About from '../components/pages/About';
import Feedbackform from '../components/FeedbackForm';
import ApartForm from '../components/createApart/CreateApartForm';
import ApartTypeForm from '../components/createApartType/CreateApartTypeForm';
import EditEventForm from '../components/createEvent/EditEventForm';
import VoteResultsCard from '../components/VoteResultsCard';
import { fetchApartTypes } from '../features/aparttypes/aparttypesSlice';
import { fetchAparts } from '../features/apartsSlice/apartsSlice';
import EditApartForm from '../components/createApart/EditApartForm';
import EditApartTypeForm from '../components/createApartType/EditApartTypeForm';
import VotersList from '../components/participants/VotersList';
import MyEvents from '../components/pages/MyEvents';
import ParticipantsProfile from '../components/profile/ParticipantsProfile';


function App() {
  const dispatch = useDispatch();
  // const authChecked = useSelector(selectAuthChecked);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchEventOptions());
    dispatch(fetchApartTypes());
    dispatch(fetchAparts());
    dispatch(getEvent());
    dispatch(fetchUsers());
    dispatch(fetchGenders());
    dispatch(getParticipants());
    dispatch(fetchCountries());
  }, [dispatch]);

  // if (!authChecked) {
  //   return (
  //     <div className="spinner-border text-primary" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Event />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/votes/:eventId" element={<VoteComponent />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/usersprofile" element={<Usersprofile />} />
        <Route path="/test" element={<VoteResultsCard round="options"/>} />
        <Route path="/usersprofile" element={<ParticipantsProfile userId="2" />} />
        <Route path="/test" element={<VotersList eventId="1" round="options"/>} />
        <Route path="/create/event" element={<EventForm />} />
        <Route path="/edit/event/:id" element={<EditEventForm />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/edit/apart/:id" element={<EditApartForm />} />
        <Route path="/edit/apartType/:id" element={<EditApartTypeForm />} />
        <Route path="/create/apart/:id" element={<ApartForm />} />
        <Route path="/create/apartType/:id" element={<ApartTypeForm />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedbackform />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { useLayoutEffect } from 'react';
import { Grid } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../features/event/eventSlice';
import Events from './Events';


const Event = () => {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.event.events)
  
  useLayoutEffect(()=>{
    dispatch(getEvent())
  },[])
  return (
    <>
    <Grid.Container gap={2} justify="center">
      {events?.map(event=>(
          <Grid key={event.id}><Events event={event}/></Grid>
      ))}
    </Grid.Container>
    </>
  );
}

export default Event;

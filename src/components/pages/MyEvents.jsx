import { Grid } from '@geist-ui/core'
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvent } from '../../features/event/eventSlice'
import Events from '../event/Events'

export default function MyEvents() {
    const user = useSelector((state) => state.auth?.user)
    const dispatch = useDispatch()
    const participatesIn = useSelector((state) => state.participant?.participants).filter((el) => user?.id === el.userId).map((el) => el.eventId)
    const events = useSelector((state) => state.event.events).filter((el) => participatesIn.some((elem) => elem === el.id))
    
    useLayoutEffect(()=>{
      dispatch(getEvent())
    },[])
    return (
      <>
      <Grid.Container gap={2} justify="center">
        {events?.map(event=>(
            <Grid><Events key={event.id} event={event} inprofile={true}/></Grid>
        ))}
      </Grid.Container>
      </>
    );
}

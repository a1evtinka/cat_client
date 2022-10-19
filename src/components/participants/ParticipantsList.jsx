import React from 'react'
import { useSelector } from 'react-redux'
import ShortProfile from '../profile/ShortProfile'
import { Grid } from '@geist-ui/core';

export default function ParticipantsList({eventId}) {
  const list = useSelector((state) => state.participant.participants.filter((el) => el.eventId === +eventId))
  return (
    <Grid.Container gap={1.5} justify="center">
        {list.map((el) => 
        <Grid xs={4} key={el.id} >
          <ShortProfile key={el.id} userId={el.userId}/>
        </Grid>)}
    </Grid.Container>
  )
}

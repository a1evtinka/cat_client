import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VoteComponent from '../VoteComponent'
import { Text, Tabs, useTabs, Button, Grid, Spacer } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, setRound } from '../../features/event/eventSlice';
import { fetchOptionsWithVotes, selectEventOptions } from '../../features/eventoptions/eventOptionsSlice';
import Comments from '../comments/Comment';
import Usersprofile from '../profile/Usersprofile';
import Events from '../event/Events';
import EventLong from '../event/EventLong';
import ParticipantsList from '../participants/ParticipantsList';
import styled from 'styled-components';
import Rules from '../Rules';
import CommentsList from '../comments/CommentsList';
import { fetchApartTypesWithVotes, selectApartTypesVotes, selectApartTypesWithVotes } from '../../features/aparttypes/aparttypesSlice';
import { fetchApartsWithVotes, selectApartsWithVotes } from '../../features/apartsSlice/apartsSlice';
import ParticipantsProfile from '../profile/ParticipantsProfile';
import VoteResultsCard from '../VoteResultsCard';

const Center = styled.div`
margin: auto;
width: 70%;
`;

export default function EventPage() {
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth?.user?.id)
    const {eventId} = useParams()
    // const allApartsVotes = useSelector(sel)
    const event = useSelector(selectEvents).find((el) => el.id === +eventId)
    const options = useSelector(selectEventOptions)?.filter((el) => el.eventId === +eventId)
    const apartTypes = useSelector(selectApartTypesWithVotes)?.filter((el) => el.eventId === +eventId)
    const aparts = useSelector(selectApartsWithVotes)?.filter((el) => el.eventId === +eventId)
    // console.log(eventId);
    // console.log(apartTypes);
    const [timer, setTimer] = useState()
    // const choice = options.filter((el) => el.OptionVotes.find((el) => el.userId === id))
    // console.log(choice[0].OptionsVor);

    useEffect(() => {
      if(event?.round === 1) {
        dispatch(fetchOptionsWithVotes(event?.id))
      } else if (event?.round === 2){
        dispatch(fetchApartTypesWithVotes(event?.id))
      } else if(event?.round === 3){
        dispatch(fetchApartsWithVotes(event?.id))
      } 
  }, [dispatch])


  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //     if(event?.round === 1) {
  //       // dispatch(fetchOptionsWithVotes(event?.id))
  //       const countdown = setTimer(() => new Date(event?.startDate).getTime()-5097600000 - new Date().getTime())
  //     } else if (event?.round === 2){
  //       // dispatch(fetchApartTypesWithVotes(event?.id))
  //       const countdown = setTimer(() => new Date(event?.startDate).getTime()-3888000000 - new Date().getTime())
  //       console.log(timer);
  //     } else if(event?.round === 3){
  //       // dispatch(fetchApartsWithVotes(event?.id))
  //       const countdown = setTimer(() => new Date(event?.startDate).getTime()-2592000000 - new Date().getTime())
  //     } else if (timer <= 0 ){
  //       setTimeIsOver(true)
  //       clearTimeout(timeoutId)
  //     }
  //     }, 1000)
  //     return () => clearTimeout(timeoutId)
  // }, [timer])

    const title = 'Организатора'
    const width = '100%'


  return (
    <div>
        <Tabs initialValue="4" align="center">
          {(id === event?.userId && event.round !== 4) &&
          <>
          <Grid.Container justify='center'>
            <Grid>
              <Button onClick={() => dispatch(setRound({id: eventId, round: event?.round}))}>Закончить досрочно</Button>
            </Grid> 
          </Grid.Container>
          <Spacer/>
          </>
          }
          <Tabs.Item label="Основное" value="1">
            {event && <EventLong round={event?.round} event={event} timer={timer}/>}</Tabs.Item>
          <Tabs.Item label="Организатор" value="2"><ParticipantsProfile userId={event?.userId} title={title} width={width}/></Tabs.Item>
          <Tabs.Item label="Участники" value="3">{event && <ParticipantsList eventId={event?.id} />}</Tabs.Item>
          <Tabs.Item label="Голосование" value="4">
            {event?.round === 1
            ?
            <>
            <VoteComponent round={'options'}/> 
            </>
            : event?.round === 2
            ?
            <>
            <VoteComponent round={'apartTypes'}/> 
            <VoteResultsCard round={'options'}/>
            </>
            : event?.round === 3
            ?
            <>
            <VoteComponent round={'aparts'}/> 
            <VoteResultsCard round={'options'}/>
            <VoteResultsCard round={'apartTypes'}/>
            </>
            :
            <>
            <VoteResultsCard round={'options'}/>
            <VoteResultsCard round={'apartTypes'}/>
            <VoteResultsCard round={'aparts'}/>
            </>
            }</Tabs.Item>
          <Tabs.Item label="Обсуждение" value="5"><CommentsList/></Tabs.Item>
          <Tabs.Item label="Правила" value="6"><Rules/></Tabs.Item>
        </Tabs>
    </div>
  )
}

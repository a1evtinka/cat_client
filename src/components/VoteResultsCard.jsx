import { Card, Display, Grid, Image, Text } from '@geist-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartComponent from './ChartComponent';
import { addVote, fetchEventOptions, selectAllVotesEventOptions, selectEventOptions } from '../features/eventoptions/eventOptionsSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchApartTypes, selectApartTypes, selectApartTypesVotes } from '../features/aparttypes/aparttypesSlice';
import { selectEvents } from '../features/event/eventSlice';
import { fetchAparts, selectAparts, selectApartsVotes } from '../features/apartsSlice/apartsSlice';


export default function VoteResultsCard({round}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventOptions())
  }, [dispatch])
  const { eventId } = useParams();
  // const eventId = "1";
  const options = useSelector(selectEventOptions).filter((el) => el.eventId === +eventId)
  const apartTypes = useSelector(selectApartTypes).filter((el) => el.eventId === +eventId)
  const aparts = useSelector(selectAparts).filter((el) => el.eventId === +eventId)
  const allOptionsVotes = useSelector(selectAllVotesEventOptions)
  const allApartsTypesVotes = useSelector(selectApartTypesVotes)
  const allApartsVotes = useSelector(selectApartsVotes)
  
  const allVotes = {
    "options": allOptionsVotes,
    "apartTypes": allApartsTypesVotes,
    "aparts": allApartsVotes
  }
  const voteRound = {
    "options": options,
    "apartTypes": apartTypes,
    "aparts": aparts
  }

  const winner = voteRound[round].find((el) => el.winner === true)
  useEffect(() => {
    console.log(winner);
  }, [voteRound])

  return (
    <>
    <Grid.Container justify="center">
     <Card width="50rem" height="30rem" align="center">
     <Text h4 paddingTop="30px">{winner?.title}</Text>
     <Display shadow caption={`вариант, за который проголосовало большинство участников`}>
       <Image width="435px" height="50%" src={winner?.photo} />
     </Display>
    </Card>
    </Grid.Container>
    </>
  );
}

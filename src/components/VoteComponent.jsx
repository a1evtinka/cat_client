import { Card, Grid } from '@geist-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartComponent from './ChartComponent';
import EventCard from './events/EventCard';
import AnimatedCardComponent from './AnimatedCardComponent';
import { addVote, addVotesFetch, fetchEventOptions, selectAllVotesEventOptions, selectEventOptions } from '../features/eventoptions/eventOptionsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { addApartTypeVote, addApartTypeVotesFetch, selectApartTypes, selectApartTypesVotes } from '../features/aparttypes/aparttypesSlice';
import { selectAparts, selectApartsVotes, addApartsVote, addApartsVotesFetch } from '../features/apartsSlice/apartsSlice';


export default function VoteComponent({round}) {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth?.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventOptions())
  }, [dispatch])
  const { eventId } = useParams();
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

  return (
    <>
      <ChartComponent votes={voteRound[round]}/>
      <Grid.Container justify="center" alignContent="center">
        <Grid md={18}>
          <Card shadow width="100%">
            <Card.Content style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}
            >
              {voteRound[round]?.map((option) => (
                <Grid md={12} key={option.id} padding='5px'>
                <AnimatedCardComponent>
                  <EventCard
                  // пропсы
                    photo={option.photo}
                    title={option.title}
                    description={option.description}
                    votes={option.votes}
                    allVotes={allVotes[round]}
                    budget={option.budget}
                    setVotes={() => {
                    user ? 
                    round === 'options'
                    ?
                    dispatch(addVotesFetch({optionId: option.id, userId:user.id, eventId: eventId}))
                    :
                    round === 'apartTypes' 
                    ?
                    dispatch(addApartTypeVotesFetch({optionId: option.id, userId:user.id, eventId: eventId}))
                    :
                    round === 'aparts'
                    ?
                    dispatch(addApartsVotesFetch({optionId: option.id, userId:user.id, eventId: eventId}))
                    : 
                    null 
                    :
                    navigate('/auth/register')
                      }}
                    />
                </AnimatedCardComponent>
                </Grid>
              ))}
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}

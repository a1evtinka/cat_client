import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Card, Tag } from '@geist-ui/core';
import AvatarProfile from '../profile/AvatarProfile';
import { useParams } from 'react-router-dom';
import { selectEventOptions } from '../../features/eventoptions/eventOptionsSlice';

export default function VotersList({ round }) {
  const { eventId } = useParams()
  const list = useSelector((state) => state.participant.participants.filter((el) => el.eventId === +eventId))
  const options = useSelector(selectEventOptions).filter((el) => el.eventId === +eventId)
  const optionsIds = useSelector(selectEventOptions).filter((el) => el.eventId === +eventId).map((el) => el.id)

  const usersChoice = options?.find((elem) => elem.OptionVotes.find((option) => option?.userId === list[0].userId))?.title

  // console.log(usersChoice);

  // function getUsersChoice(userId) {
  //   const choice = votes?.map((el) => el.OptionVotes.find((option) => option.userId === userId))
  //   console.log(choice[0].optionId)
  //   return choice[0].optionId
  // }
  useEffect(() => {
    console.log(options, 'ggg')
  }, [])

  return (
    <>
      <Grid.Container gap={2} justify="center" alignContent='center' style={{ display: 'flex', flexDirection: 'column' }}>
        {list.map((el) =>
          <Grid xs={12} sm={8} key={el.id} >
            <Card shadow width="100%" height="60px" >
              <AvatarProfile key={el.id} userId={el.userId} />
              <br />
              {options?.find((elem) => elem.OptionVotes.find((option) => option.userId === el.userId))?.title
              ? (<Tag type="warning">{options?.find((elem) => elem.OptionVotes.find((option) => option.userId === el.userId))?.title}</Tag>)
              : <></>}
            </ Card>
          </Grid>)}
      </Grid.Container>
    </>
  )
}

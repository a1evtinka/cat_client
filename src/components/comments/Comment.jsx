import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

import { Button, Card, Image, Textarea, Spacer, Input, Text, Select, Divider } from '@geist-ui/core';
import { fetchGetComments } from '../../features/comments/commentsSlice'
import Avatar from '../profile/Avatar'
import ShortProfile from '../profile/ShortProfile'

const FlexContainer = styled.div`
display: flex;
justify-content: center;
height: 100px;
margin: auto;
`;

export default function Comments() {
  const users = useSelector((state) => state.users.users)
  const {comments} = useSelector(state => state.comments)
  const {eventId} = useParams()
  const dispatch = useDispatch();
  // console.log(eventId)
  useEffect(()=>{
    dispatch(fetchGetComments(eventId))
    // return () => clear
  },[])


  return (
    <>
      {
        comments?.map((comment) => 
          <Card shadow key={comment.id} >
              <Avatar userId={comment.userId}/>
              <Text h5 my={0}>{users.find((el) => el.id === comment.userId).firstName} пишет: </Text>
              <Text >{comment.description}</Text>
          </Card>
      ).reverse()
        }
    </>
  )
}

import React, { useEffect } from 'react'
import ShortProfile from '../profile/ShortProfile'
import styled from 'styled-components';
import { Button, Card, Image, Textarea, Spacer, Input, Text, Select, Divider } from '@geist-ui/core';
import Avatar from '../profile/Avatar';
import { fetchAddComments, selectCommentsFormError, resetCommentsFormError } from '../../features/comments/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from './Comment';


const FlexContainer = styled.div`
display: flex;
justify-content: center;
height: 100px

`;

export default function CommentsList() {
  const {id, firstName} = useSelector(state => state.auth.user)
  const {eventId} = useParams()
  const dispatch = useDispatch();
  const error = useSelector(selectCommentsFormError);


  const commentClick = React.useCallback(
    (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      userId: id,
      description: form.description.value,
      eventId: +eventId,
    }
    
    dispatch(fetchAddComments(data))
    form.reset();

  }, [dispatch])

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetCommentsFormError());
  }, [dispatch]);

  return (
    <div >
    <Card shadow>
      {error && (
        <div align="center" className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <form onSubmit={commentClick} >
      <FlexContainer > 
        <Avatar userId={id}/>
        <Textarea placeHolder={`${firstName}, оставь комментарий...`} name="description" onChange={resetErrorOnChange} />
        <div style={{"margin": "0 0 0 1%"}} >
        <Button htmlType="submit">Комментировать</Button>
        </div>
      </FlexContainer>
      </form>
      </Card>
      <center><Comments /></center>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Textarea, Spacer, Input, Text, Select, Divider } from '@geist-ui/core';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/users/usersSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
`;

const Center = styled.form`
margin: auto;
width: 50%;
`;

const TextContainer = styled.div`
margin: auto;
width: 50%;
text-align: center;
`;


export default function Feedbackform() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const id = useSelector(state => state.auth.user?.id)
  // const name = useSelector(state => state.auth.user)
  // const user = useSelector(state => state.users.users.find((user) => user.id === id))

  const feedBackFormHandler = async (e) => {
    e.preventDefault();
    
    const res = await axios.post(`/api/feedback/${id}`, {
      text: e.target.feedbackInput.value
    })
    .then(data => setMessage(data))  
    navigate('/')
  }
    return (
      <Center
        onSubmit={(e) => feedBackFormHandler(e)}>
        <Card shadow width="50rem" height="27rem">
          <FlexContainer>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Spacer></Spacer>
            </div>
            <TextContainer>
              <Text h4 my={0}>Связь с организаторами</Text>
              <Divider my={4} />
            </TextContainer>
          </FlexContainer>
          <Textarea name='feedbackInput' type="warning" width="100%" height="200px" placeholder="напишите все что хотите" />
          <Spacer w={.5} inline /><p></p>
          <TextContainer>
            <Button onClick={() => navigate('/')}
              scale={1 / 3}
              htmlType="Submit"
            >Сохранить
            </Button>
          </TextContainer>
        </Card>
      </Center>
    );
  }


import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Textarea, Spacer, Input, Text, Select, Divider } from '@geist-ui/core';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/users/usersSlice';
const axios = require('axios').default;

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

const ImageCropper = styled.div`
margin: 3% 0 0 3%;
width: 300px;
height: 300px;
position: relative;
overflow: hidden;
border-radius: 50%;
`;

const StyledImage = styled.img`
display: inline;
margin: 0 auto;
height: 100%;
width: auto;
`;


export default function Usersprofile() {
  const [profilePhoto, setProfilePhoto] = useState('')
  console.log(profilePhoto);
  const [img, setImg] = useState(null)
  const users = useSelector(selectUsers)
  const id = useSelector(state => state.auth.user?.id)
  const name = useSelector(state => state.auth.user)
  const user = useSelector(state => state.users.users.find((user) => user.id === id))

  const [saveButton, setSaveButton] = useState(false)
  function showSaveButton() {
    setSaveButton(true)
  }

  const sendFile = async () => {
    try {
      console.log(111);
      const data = new FormData()
      data.append('profilePhoto', img)
      const res = await axios.put(`/api/users/${id}/photo`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => setProfilePhoto(data.data))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Center>
      <Card shadow width="50rem" height="50rem">
        <FlexContainer>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <ImageCropper>
              <StyledImage src={profilePhoto || user?.photo}></StyledImage>
            </ImageCropper>
            <Spacer></Spacer>
            <div>
              <Input htmlType='file' onChange={(e) => setImg(e.target.files[0])}></Input>
              <Button onClick={sendFile}>Изменить</Button>
            </div>
            <Spacer></Spacer>
          </div>
          <TextContainer>
            <Text h4 my={0}>Мой профиль</Text>
            <Divider my={4} />
            <Input onChange={showSaveButton} initialValue="Каджик" /><p></p>
            <Input initialValue={users[0]?.firstName} /><p></p>
            <Input initialValue="программист" /><p></p>
            <Select width="231.5px" placeholder="Choose one" initialValue="1">
              <Select.Option value="1">мужской</Select.Option>
              <Select.Option value="2">женский</Select.Option>
            </Select><p></p>
            <Input onChange={showSaveButton} htmlType="date" width="231.5px" value="1993-02-02" /><p></p>
          </TextContainer>
        </FlexContainer>
        <Textarea type="warning" width="100%" height="200px" defaultValue={users[0]?.interests} />
        <Spacer w={.5} inline /><p></p>
        {saveButton &&
          <Button >Сохранить</Button>
        }
      </Card>
    </Center>
  );
}

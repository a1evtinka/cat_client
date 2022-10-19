import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Textarea, Spacer, Input, Text, Select, Divider } from '@geist-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
`;

const Center = styled.form`
margin: 5% 20% 0 25%;
width: 50%;
`;

const TextContainer = styled.div`
margin: auto;
width: 50%;
text-align: center;
`;

const ImageCropper = styled.div`
margin: 0 0 0 0;
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


export default function ParticipantsProfile({userId, title, width}) {    

  const user = useSelector(state => state.users.users.find((user) => user.id === +userId))
  console.log("🚀 ~ file: ParticipantsProfile.jsx ~ line 42 ~ ParticipantsProfile ~  user ",  user )

  // useEffect(() => console.log(user?.photo), [])


  return (
    <Center>
        <FlexContainer>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <ImageCropper>
              <StyledImage src={user?.photo ? "/"+user?.photo : "https://media.istockphoto.com/vectors/neko-talkcat-and-pc-vector-id858052262?k=20&m=858052262&s=170667a&w=0&h=MH5DzuhNxohhlZQma_MEMZoyFxpYlea6yibdcm11VMc="}></StyledImage>
            </ImageCropper>
            <Spacer></Spacer>
              <Spacer w={34} inline />
          </div>
          <TextContainer>
            <Text h4 my={0}>Профиль {title}</Text>            
            <Divider my={4} />
            <Input readOnly  width="231.5px"  initialValue={user?.firstName} /><p></p>
            <Input readOnly  width="231.5px"  initialValue={user?.lastName} /><p></p>
            <Input readOnly  width="231.5px"  htmlType="date" value={user?.birthday.substring(0, 10)}  /><p></p>
            <Input readOnly  width="231.5px"  initialValue={user?.profession} /><p></p>
            <Input readOnly  width="231.5px"  initialValue={user?.city} /><p></p>
          </TextContainer>
        </FlexContainer>
        <Textarea readOnly type="warning" width={width} height="100px" value={`Что люблю: ${user?.interests}`}  />
        
        <Spacer w={.5} inline /><p></p>
    </Center>
  );
}

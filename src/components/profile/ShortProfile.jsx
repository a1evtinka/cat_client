import React, { useState } from 'react';
import { Card, Text, User, Grid, Modal, Divider } from '@geist-ui/core';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/users/usersSlice';
import styled from 'styled-components';
import Avatar from './Avatar';
import ParticipantsProfile from './ParticipantsProfile';

export default function ShortProfile({userId}) {
  const user = useSelector((state) => state.users.users.find((el) => el.id === userId))
  const title = 'Участника'
  const width = '113%'
  // состояние модалки
  const [state, setState] = useState(false)
  const handler = () => setState(true)
  const closeHandler = (event) => {
    setState(false)
  }

  return (
    <>
        <Card align="center" width="100%" hoverable onClick={handler}>
          <Avatar userId={userId} />
          <Text paddingTop="16px" h4 my={0} style={{ textTransform: 'uppercase' }}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Divider type="warning"/>
          <Text>{user?.profession}</Text>
        </Card>
    {/* <User onClick={handler} src="https://unix.bio/assets/avatar.png" name={user.firstName}>
     {user.profession}
    </User> */}
    <Modal width="60%" height="100%" visible={state} onClose={closeHandler}>
         {/* <Modal.Title>titlr</Modal.Title>
         <Modal.Subtitle>{}</Modal.Subtitle>
         <Modal.Content> */}
           <ParticipantsProfile userId={userId} title={title} width={width}/>
         {/* </Modal.Content> */}
         <Modal.Action passive onClick={() => setState(false)}>Закрыть</Modal.Action>
         {/* <Modal.Action>Голосовать</Modal.Action> */}
      </Modal>
    </>
  )
}

import React, { useState } from 'react';
import { Avatar, Text, User, Modal } from '@geist-ui/core';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/users/usersSlice';

export default function AvatarProfile({userId}) {
  const user = useSelector((state) => state.users.users.find((el) => el.id === userId))

  return (
    <>
    <User src={ user?.photo ? ('/' + user.photo) : "https://media.istockphoto.com/vectors/neko-talkcat-and-pc-vector-id858052262?k=20&m=858052262&s=170667a&w=0&h=MH5DzuhNxohhlZQma_MEMZoyFxpYlea6yibdcm11VMc="} 
    name={`${user?.firstName} ${user?.lastName}`}>
     {user?.profession}
    </User>
    </>
  )
}

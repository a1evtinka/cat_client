import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// margin: 3% 0 0 3%; изначально
const ImageCropper = styled.div`
margin: 0 1% 0 0;
width: 100px;
height: 100px;
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

export default function Avatar({userId}) {
  const user = useSelector((state) => state.users.users.find((el) => el.id === userId))
  console.log(user?.photo);
  
  return (
    <>
          <ImageCropper>
             <StyledImage src={ user?.photo ? ('/' + user.photo) : "https://media.istockphoto.com/vectors/neko-talkcat-and-pc-vector-id858052262?k=20&m=858052262&s=170667a&w=0&h=MH5DzuhNxohhlZQma_MEMZoyFxpYlea6yibdcm11VMc="}></StyledImage>  
          </ImageCropper>
    </>
    )
}
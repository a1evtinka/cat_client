import React, { useState } from 'react';
import { Card, Text, Link, Button, Modal, Image, Spacer, Divider } from '@geist-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Description = styled.div`
float: right;
text-align: center;
width: 60%;
@media (max-width: 768px) {
  font-size: 12px;
}
`;

const ImageCropper = styled.div`
width: 40%;
height: 100%;
position: relative;
overflow: hidden;
border-radius: 6px 65% 0 6px;
`;

const CroppedImage = styled.img`
display: inline;
margin: 0 auto;
height: 100%;
width: auto;
`;

const Wrapper = styled.div`
margin: 0 auto;
// height: 334px;
height: 99.5%;
width: 100%;
// width: 100%;
// left: 320px;
position: absolute;
// bottom: 166px
// bottom: calc(2 * 6px * 1/3);
`;

const FlexContainer = styled.div`
display:: flex;
`;

export default function EventCard({title, description, budget, votes, photo, setVotes, allVotes}) {
  // const {event} = useSelector((store) => store.events)
  function calculatePercent(num){
    const calc = Math.round((num / allVotes) * 100)
    return calc ? calc + '%' : '0%';
  };
  function truncate(str){
    return (str?.length > 45) ? str.substr(0, 44) + '...' : str;
  };
  const percent = calculatePercent(votes)
  // const shortDescription = truncate('title')
  const [state, setState] = useState(false)
  const handler = () => setState(true)
  const closeHandler = (event) => {
    setState(false)
    console.log('closed')
  }
  const handeClick = () => { // записывает голос и закрывает модалку
    setVotes()
    setState(false)
  }
  return (
    <>
     <Card onClick={handler} shadow width="500px" height="99%" >
      <Card.Content position="relative" padding="0">
        <Wrapper>
          <ImageCropper>
            <CroppedImage src={photo}></CroppedImage>
          </ImageCropper>
        </Wrapper>
          <Description>
          {allVotes && <Text h4 type="warning">{`${percent} голосов`}</Text>}
            <Text h4 span>{title}</Text>
            <Text margin='5%'>{truncate(description)}</Text>
            <Text margin='5%' h6 type="secondary" mb={0}>{`Бюджет: ~ ${budget} тыс.`}</Text>
            </Description>
      </Card.Content>
     </Card>
      <Modal width="60rem" height="50rem" visible={state} onClose={closeHandler}>
         <Modal.Title>{title}</Modal.Title>
         <Modal.Subtitle>{}</Modal.Subtitle>
         <Modal.Content>
           <p>{description}</p>
           <Image src={photo}></Image>
         </Modal.Content>
         <Modal.Action passive onClick={() => setState(false)}>Закрыть</Modal.Action>
         <Modal.Action onClick={handeClick}>Голосовать</Modal.Action>
      </Modal>
    </>
  );

// export default function EventCard({ title, src}) {
//  return (
//         //если хотим чтобы карточка заполняла слайдер на 100% собственно ставим 100%
//         <Card shadow width="90%" height="90%" > 
//          <Text h6 mb={5}>13.04-12.03.2022</Text>
//          <Text h4 mb={0}>{title}</Text>
//          <img src={`${src}`}></img>
//         <Description>
//            whatever <br />
//            Тут ваше описание и вообще все что мы хотим увидеть и так далее

//          </Description>
//         </Card>
//      );

}

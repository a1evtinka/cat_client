import React from 'react'
import { Card, Dot, Text, Textarea, Display, Image, Code, useTabs, Grid } from '@geist-ui/core';
import styled from 'styled-components';
import { selectEventOptions } from '../../features/eventoptions/eventOptionsSlice';
import { useSelector } from 'react-redux';
import CardSlider from '../../features/main/CardSlider';
import CardItem from '../../features/main/CardItem';
import Timer from '../Timer';
import { useNavigate } from 'react-router-dom';
import Timer2 from '../Timer2';
import { selectApartTypes } from '../../features/aparttypes/aparttypesSlice';
import { selectAparts } from '../../features/apartsSlice/apartsSlice';


const Center = styled.div`
margin: auto;
text-align: center;
`
// нужно брать из базы из связанной таблицы
const statuses = [
    {id: 1, status: 'предложено'},
    {id: 2, status: 'организация'},
    {id: 3, status: 'отменено'},
    {id: 4, status: 'проведено'},
]
export default function EventLong({ event, timer}) {
  const { setState, bindings } = useTabs('1')
  const navigate = useNavigate()
  const user = useSelector(state => state.auth?.user)
  const rounds = {
    1: selectEventOptions,
    2: selectApartTypes,
    3: selectAparts,
  }


const options = useSelector(rounds[event?.round]).filter((el) => el.eventId === +event.id)

const start = new Date(event?.startDate)
const end = new Date(event?.endDate)
  return (
    <Grid.Container justify='center'>
      <Grid>
        <Center>
          <Card shadow width="60rem" height="50rem">
            <Text h3>{event?.eventTitle}</Text>
            <Text>{`${start.toLocaleDateString()} - ${end.toLocaleDateString()}`}</Text>
            {statuses.map((el) => el.id === event?.statusId 
            ? <Dot key={el.id} style={{ marginRight: '20px' }} type="warning">{el.status}</Dot> 
            : <Dot key={el.id} style={{ marginRight: '20px' }}>{el.status}</Dot>)}
            <p></p><Text h6>{`До окончания голосования ${event?.round} этапа: `}</Text><p></p>
            <Timer2 start={event?.startDate} round={event?.round}/>
            <CardSlider
            list={options} //  тут передаётся подставной список для создания слайдера
            renderItem={CardItem}
            width={750} // здесь то насколько карточки видно из-за главной карты, 
            boxWidth={1000} // оба этих параметра можно менять чтобы изменить эффект слайдера
            opacity={0.75} // прозрачность карт на заднем фоне
            scale={0.9} // маштаб относительно основной карты для изменения онной
            disableNext={false}
            disablePrev={false}
            setVotes={() => user ? setState("4") : navigate('/auth/register')} 
            index={3}
            onChange={() => {
              console.log("перемещение"); //можно повесить действие на перемещение но зачем) работает странно после переноса с jsx сначала в холостую а потом норм.
            }}
            /><p></p>
            <Textarea type="warning" width="100%" height="200px" value={event?.description} />
          </Card>
        </Center>
      </Grid>
    </Grid.Container>
  )
}

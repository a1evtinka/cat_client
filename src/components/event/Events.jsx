import { Card, Button, Spacer, useToasts } from '@geist-ui/core';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventOptions, selectEventOptions, selectWinner } from '../../features/eventoptions/eventOptionsSlice';
import CardItem from '../../features/main/CardItem';
import CardSlider from '../../features/main/CardSlider';
import { addParticipant, getParticipants, selectParticipants } from '../../features/participants/participantsSlice';
import Timer from '../Timer';
import { selectApartTypes } from '../../features/aparttypes/aparttypesSlice';
import { selectAparts } from '../../features/apartsSlice/apartsSlice';

const Events = ({ event, inprofile }) => {
  const user = useSelector(state => state.auth?.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const rounds = {
    1: selectEventOptions,
    2: selectApartTypes,
    3: selectAparts,
    4: selectWinner,
  }

  useEffect(() => {
    dispatch(getParticipants())
    dispatch(fetchEventOptions())
  }, [])
  /********************************************************************************************/
  // TODO: здесь надо получать количество людей для того чтобы знать сколько едет на этот ивент
  /********************************************************************************************/
  const list = useSelector(rounds[event?.round]).filter((el) => el.eventId === event.id)
  const participantsCount = useSelector(selectParticipants).filter((el) => el.eventId === event.id)
  const participants = participantsCount.map((el) => el.userId)
  console.log(participants);
  const apartsTypes = useSelector(rounds[2]).filter((el) => el.eventId === event.id)
  const aparts = useSelector(rounds[3]).filter((el) => el.eventId === event.id)
  console.log(aparts);
  console.log(apartsTypes);
  const { setToast } = useToasts()
  const click = () => setToast({ text: 'Сначала запишитесь!', type: 'error', delay: 2000})
  
  function register() {
    dispatch(addParticipant({eventId: event.id, userId: user.id}))
    navigate(`/events/${event.id}`)
  }

  return (
    <Card style={{ textAlign: 'center', width: "100%" }} hoverable>
      <Card.Content position="relative" padding="0">
        <Timer start={event.startDate}></Timer>
        <h1>{event.eventTitle}</h1>
        <h4>Дата мероприятия: {event.startDate.slice(0, 10)} - {event.endDate.slice(0, 10)}</h4>{event.title}
        <h4>Ограничение по количеству {participantsCount.length}/{event.maxParticipants} </h4>
      </Card.Content>
      <Spacer/>
      {
      user?.id === event?.userId && 
      <>
      {apartsTypes.length === 0 &&
      <>
      <Button onClick={() => navigate(`/create/apartType/${event.id}`)}>Создать 2 этап</Button>
      {" "}
      </>
      }
      {aparts.length === 0 &&
      <>
      <Button onClick={() => navigate(`/create/apart/${event.id}`)}>Создать 3 этап</Button> 
      {''}
      </>
      }
      </>
      }
      <Spacer/>
      <CardSlider
        list={list} //  тут передаётся подставной список для создания слайдера
        renderItem={CardItem}
        width={750} // здесь то насколько карточки видно из-за главной карты, 
        boxWidth={1000} // оба этих параметра можно менять чтобы изменить эффект слайдера
        opacity={0.75} // прозрачность карт на заднем фоне
        scale={0.9} // маштаб относительно основной карты для изменения онной
        disableNext={false}
        disablePrev={false}
        index={3}
        setVotes={() => user ? participants.includes(user?.id) ? navigate(`/events/${event.id}`) : click() : navigate('auth/register')} // 1. передаем сюда пропс
        onChange={() => {
          console.log("перемещение"); //можно повесить действие на перемещение но зачем) работает странно после переноса с jsx сначала в холостую а потом норм.
        }}
      />
      <Spacer h={2}/>
      {inprofile ?
      <Link scale={1.5} to={`/events/${event.id}`}><Button type='success'>Подробнее</Button></Link>
      :
      <>
      {((event.round !== 4)) &&
      <Button scale={1.5} type='success' onClick={() => user ? (participants.includes(user?.id)) ? navigate(`/events/${event.id}`) : click() : navigate('auth/register')}>Проголосовать</Button>
      }
      {((event.round !== 4) && (!participants.includes(user?.id) || !user || participantsCount.length === event.maxParticipants)) &&
      <>
      <Button scale={1.5} type='warning' onClick={register}>Стать участником</Button> <br />
      </>
      }
      {
      user?.id === event?.userId && 
      <>
      <Spacer/>
      <Button onClick={() => navigate(`/edit/event/${event.id}`)}>Редактировать 1 этап</Button>{' '}
      {apartsTypes.length !== 0 &&
      <>
      <Button onClick={() => navigate(`/edit/apartType/${event.id}`)}>Редактировать 2 этап</Button>
      {' '}
      </>}
      {aparts.length !== 0 &&<Button onClick={() => navigate(`/edit/apart/${event.id}`)}>Редактировать 3 этап</Button>}
      </>
      }
      </>
      }
      <Spacer h={2}/>
    </Card>
  );
}

export default Events;

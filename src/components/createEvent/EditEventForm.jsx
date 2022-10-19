import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Image, Input, Select, } from '@geist-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editEvent, putEvent } from '../../features/createEventSlice/createEventSlice';
import { useNavigate, useParams, } from 'react-router-dom';

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
`;
const Center = styled.form`
margin: auto;
width: 50%;
`;
const ImageCropper = styled.div`
margin: 3% 0 0 3%;
width: 200px;
height: 200px;
position: relative;
overflow: hidden;
border-radius: 50%;
`;
const StyledImage = styled.img`
display: inline;
margin: 0 auto;
height: 50%;
width: auto;
`;

const EditEventForm = () => {

  const { id: eventId } = useParams()
  // console.log("🚀 ~ file: EditEventForm.jsx ~ line 33 ~ EditEventForm ~ eventId", eventId)
  const event = useSelector((state) => state.event)
  // console.log("🚀 ~ file: EditEventForm.jsx ~ line 39 ~ EditEventForm ~ state ", event)
  let thisEvent = event.events?.filter((el) => el.id === +eventId)
  // console.log("🚀 ~ file: EditEventForm.jsx ~ line 40 ~ EditEventForm ~ thisEvent", thisEvent)
  const eventOption = useSelector((state) => state.eventOptions)
  // console.log("🚀 ~ file: EditEventForm.jsx ~ line 43 ~ EditEventForm ~ eventOption", eventOption)
  let thisOptions = eventOption.eventOptions?.filter((el) => el.eventId === +eventId)
  // console.log("🚀 ~ file: EditEventForm.jsx ~ line 47 ~ EditEventForm ~ thisOptions", thisOptions)
  
  useEffect(()=>{

  }, [eventOption])

  // console.log(event.events.filter((el) => el.id === eventId))
  // const thisEvent = event?.filter((el) => el.id == eventId)
  const { countries } = useSelector((state) => state.countries); // доставем из стейта страны
  let countryId1; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  let countryId2; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  let countryId3; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  const countryHandler1 = (value) => countryId1 = +value;
  const countryHandler2 = (value) => countryId2 = +value;
  const countryHandler3 = (value) => countryId3 = +value;
  const [photo1, setPhoto1] = useState(thisOptions[0]?.photo)
  const [photo2, setPhoto2] = useState(thisOptions[1]?.photo)
  const [photo3, setPhoto3] = useState(thisOptions[2]?.photo)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useSelector(state => state.auth.user?.id)

  const editEvents = (e) => {
    e.preventDefault()
    const data = {
      id: eventId,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      maxParticipants: e.target.maxParticipants.value,
      eventTitle: e.target.eventTitle.value,
      description: e.target.description.value,
      userId: id,
      statusId: 1,
      options: [
        { 
          optionId: thisOptions[0].id,
          photo: e.target.photo1.value,
          title: e.target.title1.value,
          description: e.target.description1.value,
          budget: e.target.budget1.value,
          countryId: countryId1,
        },
        {
          optionId: thisOptions[1].id,
          photo: e.target.photo2.value,
          title: e.target.title2.value,
          description: e.target.description2.value,
          budget: e.target.budget2.value,
          countryId: countryId2,
        },
        {
          optionId: thisOptions[2].id,
          photo: e.target.photo3.value,
          title: e.target.title3.value,
          description: e.target.description3.value,
          budget: e.target.budget3.value,
          countryId: countryId3,
        },
      ]
    }
    dispatch(editEvent(data))
    navigate('/')
  }

  return (
    <>
      <div>
      </div><br />
      <form onSubmit={editEvents} align="center">
        <div>
          Изменение Мероприятия:
        </div>
        <br />
        <Input initialValue={thisEvent[0]?.eventTitle} name='eventTitle' htmlType='text' width="50%" required /><p></p>
        <Input initialValue={thisEvent[0]?.startDate.slice(0,10)} name='startDate' htmlType='date' width="50%" required /><p></p>
        <Input initialValue={thisEvent[0]?.endDate.slice(0,10)} name='endDate' htmlType='date' width="50%" required /><p></p>
        <Input initialValue={thisEvent[0]?.maxParticipants} name='maxParticipants' htmlType='number' width="50%" required /><p></p>
        <Input initialValue={thisEvent[0]?.description} name='description' htmlType='text' width="50%" required /><p></p>
        <div>
          Опция 1: <br />
        </div>
        <Input initialValue={thisOptions[0]?.title} name='title1' htmlType='text' width="50%" required /><p></p>
        {photo1
          ? <>
            <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input initialValue={thisOptions[0]?.photo} name='photo1' htmlType='text' width="50%" required onChange={(e) => setPhoto1(e.target.value)} /><p />
        <Input initialValue={thisOptions[0]?.description} name='description1' htmlType='text' width="50%" required /><p></p>
        <Input initialValue={thisOptions[0]?.eventOptionBudget} name='budget1' htmlType='number' width="50%" required /><p></p>
        <Select initialValue={`${thisOptions[0]?.countryId}`} placeholder="Select country" name="country" onChange={countryHandler1} width="24%" require >
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select>
        {/* initialValue={`${thisOptions[0]?.countryId}`} */}
        <div>
          Опция 2: <br />
        </div>
        <Input initialValue={thisOptions[1]?.title} name='title2' htmlType='text' width="50%" required /><p></p>
        {photo2
          ? <>
            <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
          </>
          : <></>}
        <Input initialValue={thisOptions[1]?.photo} name='photo2' htmlType='text' width="50%" required onChange={(e) => setPhoto2(e.target.value)} /><p></p>
        <Input initialValue={thisOptions[1]?.description} name='description2' htmlType='text' width="50%" required /><p></p>
        <Input initialValue={thisOptions[1]?.eventOptionBudget} name='budget2' htmlType='number' width="50%" required /><p></p>
        <Select initialValue={`${thisOptions[1]?.countryId}`} placeholder="Select country" name="country" onChange={countryHandler2} width="24%">
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select>
        <div>
          Опция 3: <br />
        </div>
        <Input initialValue={thisOptions[2]?.title}  name='title3' htmlType='text' width="50%" required /><p></p>
        {photo3
          ? <>
            <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
          </>
          : <></>}
        <Input initialValue={thisOptions[2]?.photo} name='photo3' htmlType='text' width="50%" required onChange={(e) => setPhoto3(e.target.value)} /><p></p>
        <Input initialValue={thisOptions[2]?.description} name='description3' htmlType='text' width="50%" required /><p></p>
        <Input initialValue={thisOptions[2]?.eventOptionBudget} name='budget3' htmlType='number' width="50%" required /><p></p>
        <Select 
          initialValue={`${thisOptions[2]?.countryId}`}
          placeholder="Select country" name="country" onChange={countryHandler3} width="24%">
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select><p></p>
        <br />
        <Button htmlType='submit' width="25%"> Сохранить</Button>
      </form>
    </>
  );
}

export default EditEventForm;

import React, { useState } from 'react';
import { Button, Image, Input, Select, Spacer, } from '@geist-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { putEvent } from '../../features/createEventSlice/createEventSlice';
import { useNavigate } from 'react-router-dom';

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
`;
const Form = styled.form`
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

const EventForm = () => {

  const { countries } = useSelector((state) => state.countries); // доставем из стейта страны
  let countryId1; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  let countryId2; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  let countryId3; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  const countryHandler1 = (value) => countryId1 = +value;
  const countryHandler2 = (value) => countryId2 = +value;
  const countryHandler3 = (value) => countryId3 = +value;
  const [photo1, setPhoto1] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [photo3, setPhoto3] = useState(null)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useSelector(state => state.auth.user?.id)

  const createEvents = (e) => {
    e.preventDefault()
    const data = {
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      maxParticipants: e.target.maxParticipants.value,
      eventTitle: e.target.eventTitle.value,
      description: e.target.description.value,
      userId: id,
      statusId: 1,
      options: [
        {
          photo: e.target.photo1.value,
          title: e.target.title1.value,
          description: e.target.description1.value,
          budget: e.target.budget1.value,
          countryId: countryId1,
        },
        {
          photo: e.target.photo2.value,
          title: e.target.title2.value,
          description: e.target.description2.value,
          budget: e.target.budget2.value,
          countryId: countryId2,
        },
        {
          photo: e.target.photo3.value,
          title: e.target.title3.value,
          description: e.target.description3.value,
          budget: e.target.budget3.value,
          countryId: countryId3,
        },
      ]
    }
    dispatch(putEvent(data))
    navigate('/')
  }

  return (
    <>
      <form onSubmit={createEvents} align="center" >
        <div>
          Создание Мероприятия:
        </div>
        <Spacer h={1} />

        <Input placeholder='Название мероприятия:' name='eventTitle' htmlType='text' width="50%" required /><p></p>
        <Input placeholder='Дата начала мероприятия:' name='startDate' htmlType='date' width="50%" required /><p></p>
        <Input placeholder='Дата окончания мероприятия:' name='endDate' htmlType='date' width="50%" required /><p></p>
        <Input placeholder='Лимит участвников:' name='maxParticipants' htmlType='number' width="50%" required /><p></p>
        <Input placeholder='Описание мероприятия:' name='description' htmlType='text' width="50%" required /><p></p>
        <div>
          Опция 1: <br />
        </div>
        <Spacer h={1} />

        <Input placeholder='Название локации:' name='title1' htmlType='text' width="50%" required /><p></p>
        {photo1
          ? <>
            <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
            </>
          : <></>}
        <Input placeholder='Url' name='photo1' htmlType='text' width="50%" required onChange={(e)=>setPhoto1(e.target.value)}/><p />
        <Input placeholder='Описание локации:' name='description1' htmlType='text' width="50%" required /><p></p>
        <Input placeholder='Минимальный бюджет:' name='budget1' htmlType='number' width="50%" required /><p></p>
        <Select placeholder="Select country" name="country" onChange={countryHandler1} width="24.4%">
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select>
        <Spacer h={1} />
        <div>
          Опция 2: <br />
        </div>
        <Spacer h={1} />
        <Input placeholder='Название локации:' name='title2' htmlType='text' width="50%" required /><p></p>
        {photo2
          ? <>
            <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
          </>
          : <></>}
        <Input placeholder='Url' name='photo2' htmlType='text' width="50%" required onChange={(e)=>setPhoto2(e.target.value)} /><p></p>
        <Input placeholder='Описание локации:' name='description2' htmlType='text' width="50%" required /><p></p>
        <Input placeholder='Минимальный бюджет:' name='budget2' htmlType='number' width="50%" required /><p></p>
        <Select placeholder="Select country" name="country" onChange={countryHandler2} width="24.4%">
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select>
        <Spacer h={1} />
        <div>
          Опция 3: <br />
        </div>
        <Spacer h={1} />
        <Input placeholder='Название локации:' name='title3' htmlType='text' width="50%" required /><p></p>
        {photo3
          ? <>
            <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" /><p></p>
          </>
          : <></>}
        <Input placeholder='Url' name='photo3' htmlType='text' width="50%" required onChange={(e)=>setPhoto3(e.target.value)} /><p></p>
        <Input placeholder='Описание локации:' name='description3' htmlType='text' width="50%" required /><p></p>
        <Input placeholder='Минимальный бюджет:' name='budget3' htmlType='number' width="50%" required /><p></p>
        <Select placeholder="Select country" name="country" onChange={countryHandler3} width="24.4%">
          {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
        </Select><p></p>
        <br />
        <Button htmlType='submit' width="25%"> Создать</Button>
      </form>
    </>
    // {/* <ImageCropper> // нужно ли при загрузке изображения создавать картинку 
    // того что загрузили вот этот кусок кода для этого с созданием возможных стейтов
    //     <StyledImage src={'https://independentmuseums.ru/upload/shop_3/8/8/9/item_889/item_889.jpg'}></StyledImage>
    //   </ImageCropper> */}
  );
}

export default EventForm;

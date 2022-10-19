import React, { useState } from 'react';
import { Button, Image, Input, } from '@geist-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editApTypes, putApartTypes } from '../../features/aparttypes/aparttypesSlice';
import { useNavigate, useParams } from 'react-router-dom';


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
height: 100%;
width: auto;
`;

/************************************************************************************************************************************/
// TODO: Сделать параметризированный запрос с переходом из евента чтобы получать от него айди для поля eventId.
// пока что в aparttypes.router.js на бэке жостко прописывается e.ventID. Также нужно седалть редирект с кнопки
/************************************************************************************************************************************/

const EditApartTypeForm = () => {

  const {id: eventId } = useParams()
  const apartType = useSelector((state) => state.aparttypes)
  const thisApType = apartType.apartTypes?.filter((el) => el.eventId === +eventId)
  
  const [photo1, setPhoto1] = useState(thisApType[0]?.photo)
  const [photo2, setPhoto2] = useState(thisApType[1]?.photo)
  const [photo3, setPhoto3] = useState(thisApType[2]?.photo)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const editApartsTypes = (e) => {
    e.preventDefault()
       const data = {
        id: eventId,
        options:[
          { 
            ATId: thisApType[0].id,
            photo: e.target.photo1.value,
            title: e.target.title1.value,
            description: e.target.description1.value,
          },
          {
            ATId: thisApType[1].id,
            photo: e.target.photo2.value,
            title: e.target.title2.value,
            description: e.target.description2.value,
          },
          { 
            ATId: thisApType[2].id,
            photo: e.target.photo3.value,
            title: e.target.title3.value,
            description: e.target.description3.value,
          },
        ]
      }
      dispatch(editApTypes(data))
      navigate('/')
  }

  return (
    <>
      <form onSubmit={editApartsTypes} align="center"> 
        <div>
          Типы Апартаментов 1: <br />
        </div>
        <Input  initialValue={thisApType[0]?.title}         name='title1'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo1
          ? <>
            <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input  initialValue={thisApType[0]?.photo}         onChange={(e) => setPhoto1(e.target.value)}        name='photo1'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input  initialValue={thisApType[0]?.description}   name='description1' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <div>
          Типы Апартаментов 2: <br />
        </div>
        <Input  initialValue={thisApType[1]?.title}         name='title2'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        
        {photo2
          ? <>
            <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input  initialValue={thisApType[1]?.photo}         onChange={(e) => setPhoto2(e.target.value)}        name='photo2'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApType[1]?.description}    name='description2' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <div>
          Типы Апартаментов 3: <br />
        </div>
        <Input  initialValue={thisApType[2]?.title}          name='title3'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        
        {photo3
          ? <>
            <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input  initialValue={thisApType[2]?.photo}         onChange={(e) => setPhoto3(e.target.value)}        name='photo3'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input  initialValue={thisApType[2]?.description}    name='description3' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <br />
        <Button htmlType='submit' width="25%"> Сохранить </Button>
      </form>
    </>
  );
}

export default EditApartTypeForm;

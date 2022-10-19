import React, { useState } from 'react';
import { Button, Image, Input, } from '@geist-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editApart, putApart } from '../../features/apartsSlice/apartsSlice';
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
// пока что в apart.router.js на бэке жостко прописывается e.ventID. Также нужно седалть редирект с кнопки
/************************************************************************************************************************************/

const EditApartForm = () => {

  const { id: eventId} = useParams()
  const apart = useSelector((state) => state.aparts)
  let thisApart = apart.aparts?.filter((el) => el.eventId === +eventId)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [photo1, setPhoto1] = useState(thisApart[0]?.photo)
  const [photo2, setPhoto2] = useState(thisApart[1]?.photo)
  const [photo3, setPhoto3] = useState(thisApart[2]?.photo)
 
  const editAparts = (e) => {
    e.preventDefault()
       const data = {
        id: eventId,
        options:[
          { 
            apId: thisApart[0].id,
            title: e.target.title1.value,
            photo: e.target.photo1.value,
            type: e.target.type1.value,
            description: e.target.description1.value,
            budget: e.target.budget1.value,
          },
          { 
            apId: thisApart[1].id,
            title: e.target.title2.value,
            photo: e.target.photo2.value,
            type: e.target.type2.value,
            description: e.target.description2.value,
            budget: e.target.budget2.value,
          },
          { 
            apId: thisApart[2].id,
            title: e.target.title3.value,
            photo: e.target.photo3.value,
            type: e.target.type3.value,
            description: e.target.description3.value,
            budget: e.target.budget3.value,
          },
          
        ]
      }
      dispatch(editApart(data))
      navigate('/')
  }
  
  return (
    <>
      <form onSubmit={editAparts} align="center">
        <div>
          Апартаменты 1: <br />
        </div>
        <Input initialValue={thisApart[0]?.title}         name='title1'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo1
          ? <>
            <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input initialValue={thisApart[0]?.photo}         onChange={(e) => setPhoto1(e.target.value)}        name='photo1'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[0]?.type}          name='type1'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[0]?.description}   name='description1' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[0]?.budget}        name='budget1'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>
        <div>
          Апартаменты 2: <br />
        </div>
        <Input initialValue={thisApart[1]?.title}         name='title1'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo2
          ? <>
            <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input initialValue={thisApart[1]?.photo}         onChange={(e) => setPhoto2(e.target.value)}        name='photo1'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[1]?.type}          name='type1'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[1]?.description}   name='description1' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[1]?.budget}        name='budget1'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>       <div>
          Апартаменты 3: <br />
        </div>
        <Input initialValue={thisApart[2]?.title}         name='title1'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo3
          ? <>
            <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" />
          </>
          : <></>}
        <Input initialValue={thisApart[2]?.photo}         onChange={(e) => setPhoto3(e.target.value)}        name='photo1'       placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[2]?.type}          name='type1'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[2]?.description}   name='description1' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input initialValue={thisApart[2]?.budget}        name='budget1'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>       <br />
        <Button htmlType='submit' width="25%"> Сохранить</Button>
      </form>
    </>
  );
}

export default EditApartForm;

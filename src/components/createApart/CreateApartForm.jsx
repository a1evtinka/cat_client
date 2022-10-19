import React, { useState } from 'react';
import { Button, Image, Input, Spacer, } from '@geist-ui/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { putApart } from '../../features/apartsSlice/apartsSlice';
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

const ApartForm = () => {

  const {id: eventId } = useParams()
  
  const [photo1, setPhoto1] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [photo3, setPhoto3] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const createAparts = (e) => {
    e.preventDefault()
       const data = {
        id: eventId,
        options:[
          {
            title: e.target.title1.value,
            photo: e.target.photo1.value,
            type: e.target.type1.value,
            description: e.target.description1.value,
            budget: e.target.budget1.value,
          },
          {
            title: e.target.title2.value,
            photo: e.target.photo2.value,
            type: e.target.type2.value,
            description: e.target.description2.value,
            budget: e.target.budget2.value,
          },
          {
            title: e.target.title3.value,
            photo: e.target.photo3.value,
            type: e.target.type3.value,
            description: e.target.description3.value,
            budget: e.target.budget3.value,
          },
          
        ]
      }
      dispatch(putApart(data))
      navigate('/')
  }
  
  return (
    <>
      <form onSubmit={createAparts} align="center">
        <div>
          Апартаменты 1: <br />
        </div>
        <Spacer h={1} />
        <Input name='title1'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo1
          ? <>
            <Image width="280px" height="160px" src={`${photo1}`} alt="Какая то ошибочка упси-дупси!" />
            </>
          : <></>}
        <Input name='photo1'       onChange={(e)=>setPhoto1(e.target.value)}    placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input name='type1'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input name='description1' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input name='budget1'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>
        <div>
          Апартаменты 2: <br />
        </div>
        <Spacer h={1} />
        <Input name='title2'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo2
          ? <>
            <Image width="280px" height="160px" src={`${photo2}`} alt="Какая то ошибочка упси-дупси!" />
            </>
          : <></>}
        <Input name='photo2'       onChange={(e)=>setPhoto2(e.target.value)}    placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input name='type2'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input name='description2' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input name='budget2'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>
        <div>
          Апартаменты 3: <br />
        </div>
        <Spacer h={1} />
        <Input name='title3'       placeholder='Название Апартаментов:' htmlType='text'     width="50%"   required /><p/>
        {photo3
          ? <>
            <Image width="280px" height="160px" src={`${photo3}`} alt="Какая то ошибочка упси-дупси!" />
            </>
          : <></>}
        <Input name='photo3'       onChange={(e)=>setPhoto3(e.target.value)}    placeholder='Url:'                   htmlType='text'     width="50%"   required /><p/>
        <Input name='type3'        placeholder='Вид апартаментов:'      htmlType='text'     width="50%"   required /><p/>
        <Input name='description3' placeholder='Описание:'              htmlType='text'     width="50%"   required /><p/>
        <Input name='budget3'      placeholder='Бюджет:'                htmlType='number'   width="50%"   required /><p/>
        <br />
        <Button htmlType='submit' width="25%"> Создать</Button>
      </form>
    </>
  );
}

export default ApartForm;

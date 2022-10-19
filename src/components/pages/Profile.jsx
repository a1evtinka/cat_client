/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../features/users/usersSlice';
import { Input, Spacer, Button, Textarea, Select, Card, Text, Divider } from '@geist-ui/core'
import axios from 'axios';

import styled from 'styled-components';
import { fillProfileFields, setProfile } from '../../features/profile/profileSlice';

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
`;

const Form = styled.form`
display: flex;
justify-content: center;
margin: auto;
width: 50%;
`;

const TextContainer = styled.div`
margin: auto;
width: 50%;
text-align: center;
`;

const ImageCropper = styled.div`
margin: 3% 0 0 3%;
width: 250px;
height: 250px;
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

export default function Profile() {
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState('')
  const [img, setImg] = useState(null)
  let genderId;
  let countryId;

  const id = useSelector(state => state.auth.user?.id)
  const { genders } = useSelector((state) => state.users); // достаем из стейта гендеры
  const { countries } = useSelector((state) => state.countries); // доставем из стейта страны

  const userField = useSelector((state) => state.users.users); // массив юзера с полями
  const name = useSelector(state => state.auth.user) // зареганный юзер
  const user = useSelector(state => state.users.users.find((user) => user.id === id)) // айди юзера

  const countryHandler = (value) => countryId = +value;

  const sendFile = async () => {
    try {

      const data = new FormData()
      data.append('profilePhoto', img)
      const res = await axios.put(`/api/users/${id}/photo`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => setProfilePhoto(data.data))
    } catch (error) {
      console.log(error);
    }
  }

  const saveHandlerButton = (e) => {
    e.preventDefault();

    dispatch(fillProfileFields({
      firstName: e.target.firstName.value,
      lastName: e.target.secondName.value,
      profession: e.target.profession.value,
      birthday: e.target.birthday.value,
      genderId: genderId,
      countryId: countryId,
      city: e.target.city.value,
      interests: e.target.interests.value,
      id: id,
    }))
  }


  return (
    <Form onSubmit={(e) => saveHandlerButton(e)}>
      <Card shadow width="50rem" height="50rem">
        <FlexContainer>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Spacer h={3.9} />
            <ImageCropper>
              <StyledImage src={profilePhoto || user?.photo}></StyledImage>
            </ImageCropper>
            <Spacer></Spacer>
              <Spacer w={24} inline />
            <div>
              <Input width="100%" htmlType='file' onChange={(e) => setImg(e.target.files[0])}></Input>
              <Spacer h={1}/>
              <Button width="100%" height="45%" onClick={sendFile}>Изменить Аватар</Button>
            </div>
            <Spacer h={1} />
          </div>
          <TextContainer>
            <Text h4 my={0}>Мой профиль</Text>
            <Divider my={4} />
            <Input
              name='firstName'
              // scale={2 / 3}
              placeholder="Имя"
              onChange={(e) => e.target.value}
              initialValue={userField.filter((el) => el.id === id).map(el => el.firstName)}
              width="90%"
            />
            <Spacer h={1} />

            <Input
              name='secondName'
              // scale={2 / 3}
              placeholder="Фамилия"
              onChange={(e) => e.target.value}
              initialValue={userField.filter((el) => el.id === id).map(el => el.lastName)}
              width="90%"

            />
            <Spacer h={1} />

            <Input
              name='birthday'
              label="Дата Рождения"
              htmlType='date'
              // scale={2 / 3}
              placeholder="Дата рождения"
              onChange={(e) => birthday = e}
              initialValue={userField.filter((el) => el.id === id).map(el => el.birthday.substring(0, 10))
              }
              width="90%"
            />
            <Spacer h={1} />

            <Input
              // scale={2 / 3}
              name='profession'
              placeholder="Профессия"
              initialValue={userField.filter((el) => el.id === id).map(el => el.profession)}
              width="90%"
            />
            <Spacer h={1} />

            <Select value={userField.find((el) => el.id === id)?.genderId.toString()}
              name='gender'
              width="81%"
              // scale={2 / 3}
              onChange={(e) => genderId = e}
              placeholder="Укажите пол">
              <Select.Option value="1">Муж</Select.Option>
              <Select.Option value="2">Жен</Select.Option>
            </Select>
            <Spacer h={1} />

            <Select
              value={userField.find((el) => el.id === id)?.countryId.toString()}
              placeholder="Страна"
              name="country"
              width="81%"
            // scale={2 / 3}
            >
              {countries?.map((country) => <Select.Option key={country.id}
                value={`${country.id}`}>{country.country}</Select.Option>)}
            </Select>
            <Spacer h={1} />

            <Input
              name='city'
              // scale={2 / 3}
              placeholder="Город"
              initialValue={userField.filter((el) => el.id === id).map(el => el.city)}
              width="90%"
            />
            <Spacer h={1} />
            <Spacer h={1} />

          </TextContainer>
        </FlexContainer>
        <Textarea
          type="warning"
          name='interests'
          className="input-about"
          marginLeft="20px"
          height="235px" width="95.18%" marginRight="500px"
          placeholder="Немного о себе..."
          initialValue={userField.filter((el) => el.id === id).map(el => el.interests)}

        /><Spacer h={1} />
        <Spacer w={19} inline />
        <Button
          // scale={3 / 3}
          htmlType="Submit"
        >Схоранить
        </Button>
        <Spacer w={.5} inline /><p></p>
      </Card>
    </Form>
  );
}

import { Text } from '@geist-ui/core';
import React from 'react';
// import * as React from "react";
import CardSlider from './CardSlider.jsx';
import CardItem from './CardItem.jsx';
import AllEvents from '../../components/pages/AllEvents';
import Events from '../../components/event/Events.jsx';
import Event from '../../components/event/Event.jsx';
// import './App.css';
// import CardHorizontal from './Cards/CardHorizontal.tsx';

function Main() {
  const styles = {
    margin: 30,
    textAlign: 'left'
  };

  const list = [
    { name: '1', desc: 'hahhah', src: 'https://s.zagranitsa.com/images/articles/6729/870x486/53d189dfcd54fa9ecae756ddf5a7c2ee.jpg?1530714543', },
    { name: '2', desc: 'wawawa', src: 'https://cdn.fishki.net/upload/post/201602/16/1852152/tn/0a8a0e6c36f36c8e884d3fc8b1457579.jpg', },
    { name: '3', desc: 'ohhhhh', src: 'https://funart.pro/uploads/posts/2021-04/1617233081_4-p-oboi-krasivie-gori-5.jpg' },
  ];
  const list2 = [
    { name: '4', desc: 'wawawa', src: 'https://klike.net/uploads/posts/2019-06/1559370578_1.jpg' },
    { name: '5', desc: 'ohhhhh', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANYloZlmmcGqOWeXZNDeMsgSPfsdu8BN3-Df58ksx-TniG1DNExbFH2E2rZW6LhuviEA&usqp=CAU' },
    { name: '6', desc: 'wawawa', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAo_-sd3XEyhacvVjwUUFa3XJl02pdBjeubTXeOIZdl-qb7hRqaoArWl1QLU8mYjpLGxE&usqp=CAU' },
  ]

  return (
    <>
      <Text h1>Затычка</Text>;
      <div>
        <h1 style={styles}>Варианты приключений на 5 минут:</h1>
        <div className="" style={{ textAlign: 'center' }}>

          <h1>Тут у нас место для названия приключений:</h1>

          {' '}
          <CardSlider
            list={list} //  тут передаётся подставной список для создания слайдера
            renderItem={CardItem}
            width={1750} // здесь то насколько карточки видно из-за главной карты, 
            boxWidth={1000} // оба этих параметра можно менять чтобы изменить эффект слайдера
            opacity={0.75} // прозрачность карт на заднем фоне
            scale={0.9} // маштаб относительно основной карты для изменения онной
            disableNext={false}
            disablePrev={false}
            index={3}
            onChange={() => {
              console.log("перемещение"); //можно повесить действие на перемещение но зачем) работает странно после переноса с jsx сначала в холостую а потом норм.
            }}
          />
        </div>
        <div className="" style={{ textAlign: 'center' }}>
          Тут у нас место для названия приключений:
        {/* <CardSlider
          list={list2} //  тут передаётся подставной список для создания слайдера
          renderItem={CardItem}
          width={750} // здесь то насколько карточки видно из-за главной карты, 
          boxWidth={1000} // оба этих параметра можно менять чтобы изменить эффект слайдера
          opacity={0.75} // прозрачность карт на заднем фоне
          scale={0.9} // маштаб относительно основной карты для изменения онной
          disableNext={false}
          disablePrev={false}
          index={3}
          onChange={() => {
            console.log("перемещение"); //можно повесить действие на перемещение но зачем) работает странно после переноса с jsx сначала в холостую а потом норм.
          }}
        /> */}
        </div>
      </div>
    </>
  );
}

export default Main;

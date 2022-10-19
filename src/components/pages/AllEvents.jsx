import React from 'react';
// import React, { useEffect } from 'react';
import { Grid } from '@geist-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEventOptions, fetchEventOptions } from '../../features/eventoptions/eventOptionsSlice';
import EventCard from '../events/EventCard';
// import { eventOptions } from '../../features/events/eventOptionsSlice';

export default function AllEvents() {
  const eventOptions = useSelector(selectEventOptions);
  const dispatch = useDispatch();
  console.log(eventOptions);

  useEffect(() => {
    dispatch(fetchEventOptions());
  }, [dispatch]);

// хардокод для пропсов 
const title = 'Sergiev Posad'
const description = 'Переславль-Залесский – небольшой старинный городок Ярославской области. Славное место расположилось на берегу озера Плещеева, куда впадает река с необычным названием Трубеж. Водоем послужил толчком развития российского флота. Именно на нем Петр Первый впервые организовал потешную флотилию. Петушиные бои привлекали сюда знатных особ, ведь город находится всего в 140 километрах от Москвы.'
const votes = '10'
const budget = '50'
const photo = 'https://independentmuseums.ru/upload/shop_3/8/8/9/item_889/item_889.jpg'

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={6} sm={6}><EventCard title={title} description={description} votes={votes} budget={budget} photo={photo}/></Grid>
    </Grid.Container>
  );
}

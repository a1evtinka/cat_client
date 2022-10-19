import React from 'react'
import { Text, Card, Grid } from '@geist-ui/core';

export default function Rules() {
    const rules = [
        {id: 1, text: "Улыбайтесь", type: "cyan"},
        {id: 2, text: "Будьте самостоятельными", type: "cyan"},
        {id: 3, text: "Заранее предупредите если вы веган", type: "cyan"},
        {id: 4, text: "Не будьте душными", type: "cyan"},
        {id: 5, text: "Не переживайте", type: "cyan"},
        {id: 6, text: "Будьте открытыми", type: "cyan"},
        {id: 7, text: "Возьмите ноут и зарядку", type: "cyan"},
        {id: 8, text: "Не обижайтесь", type: "cyan"},
        {id: 9, text: "Проявляйте инициативу", type: "cyan"},
    ]
  return (
    <Grid.Container justify="center">
    <Card shadow width="90%" justify="center">
    <Grid.Container gap={1.5}>
      {rules.map(rule => (
        <Grid xs={8} key={rule.id}>
          <Card type={rule.type} width="100%">
            <Text h4 my={0} style={{ textTransform: 'uppercase' }}>{rule.id}</Text>
            <Text>{rule.text}</Text>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
   </Card>
   </Grid.Container>
  )
}

import React from 'react'
import Rules from '../Rules'
import { Text, Card, Grid } from '@geist-ui/core';

export default function About() {
  return (
    <div>
      <Grid.Container justify="center">
        <Card shadow width="90%" justify="center">
          <Grid.Container gap={1.5} style={{display: 'flex', justifyContent: 'center'}}>
            <Text>Добро пожаловать на портал для организации совместной удаленной работы и поездок</Text>
          </Grid.Container>
        </Card>
      </Grid.Container><br />
      <Rules />
    </div>
  )
}

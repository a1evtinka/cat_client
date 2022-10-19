import React, { useCallback, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Card, Grid, Text } from '@geist-ui/core';
import VotersList from './participants/VotersList';
import { useParams } from 'react-router-dom';

export default function ChartComponent({ votes }) {

  const data = {
    labels: votes?.map((el) => el.title),
    datasets: [
      {
        label: '# of Votes',
        data: votes?.map((el) => el.votes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Grid.Container justify="center">
      <Grid md={18}>
        <Card width="100%">
          <Card.Content style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Grid md={8}>
              <Card width="100%" height="100%">
                <Doughnut data={data} />
              </Card>
            </Grid>
            <Grid md={18} justify="center" style={{ display: 'flex', flexDirection: 'column' }}>
            <VotersList />
              {/* {votes?.map((vote) => (
                <Card width="100%" height="30%" key={votes.id}>
                  <Text h4>За вариант {vote?.title} </Text>
                  <Text h4>проголосовало {vote?.votes}</Text>
                </Card>
              ))} */}
            </Grid>
          </Card.Content>
        </Card>
      </Grid>
    </Grid.Container>
  );
}

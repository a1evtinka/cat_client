import React, { useState } from 'react';
import { Grid, Text, Tag } from '@geist-ui/core';
import './timer.css'

function Timer2({start, round}) {   
    const rounds = {
        1: 5097600000,
        2: 3888000000,
        3: 2592000000,
    } 
    const start2 = new Date(start).getTime() - rounds[round]
    const [time, setTime] = useState()
    const countDownDate = start2;
    let timerId = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTime({days, hours, minutes, seconds})
    }, 1000);
    
    time === 0 ? clearTimeout(timerId) : ''
    return (
        <div id='clock'>
            {time && <>
            <div className='app'>
			<div className="timer-container">
				<div className="timer">
					{time.days > 9 ? time.days : '0'+time.days}
					<span><Tag>дней</Tag></span>
				</div>
				<div className="timer">
					{time.hours > 9 ? time.hours : '0'+time.hours}
					<span><Tag>часов</Tag></span>
				</div>
				<div className="timer">
					{time.minutes > 9 ? time.minutes : '0'+time.minutes}
					<span><Tag>минут</Tag></span>
				</div>
				<div className="timer">
					{time.seconds > 9 ? time.seconds : '0'+time.seconds}
					<span><Tag>секунд</Tag></span>
				</div>
                </div>
		</div>
            </>}
        </div>
      );
}

export default Timer2

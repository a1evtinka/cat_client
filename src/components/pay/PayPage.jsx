import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Grid, Toggle } from '@geist-ui/core';

function PayPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector(selectLoginFormError);
  const userId = useSelector(state => state.auth.user.id);
  const {eventId} = useParams(); // раскомментить когда добавим компонент страницу евента

  const handleSubmit = React.useCallback(
    async () => {
      const data = await fetch('/api/payment/status', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          eventId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const log = await data.json()
      console.log(log)
      if (log) { navigate(`/events/${eventId}`)}

      // if (!dispatchResult.error) {
      //   form.reset();
      //   navigate('/');
      // }
    },
    [dispatch, navigate]
  );

  // const resetErrorOnChange = React.useCallback(() => {
  //   dispatch(resetLoginFormError());
  // }, [dispatch]);

  return (
    <div style={{   display: "flex",  justifyContent: "center", }}>
    <form className="auth-form" >
      <Button htmlType="submit" onClick={handleSubmit} className="btn btn-primary">Оплатить</Button>
    </form>
   
    </div>
  );
}

export default PayPage;

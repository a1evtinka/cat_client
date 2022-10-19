import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventCard from '../../components/events/EventCard';

function CardItem({ list, style, setVotes }) {

  return (
    <div
      style={{
        width: "25vw", // 375, здесь мы можем менять размер карточки
        height: "25vh", // 208 а тут её высоту лучше писать через vw vh  чтобы была +\- адаптивность под мобилки.
        // backgroundImage: `url(${src})`,
        // background: 'purple',
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
    >
      <EventCard
        // пропсы
        photo={list.photo}
        title={list.title}
        description={list.description}
        votes={list.votes}
        budget={list.budget}
        setVotes={setVotes} // 4. передаем пропс
      />
    </div>
  );
}

export default CardItem;

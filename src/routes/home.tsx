import React from 'react';
import { Timer } from '../scripts/timer';
import TypingBox from '../components/typing-box';

const Home: React.FC = () => {
  const timer = Timer.getInstance();
  return (
    <div className="home">
      <h1 className="title">Typings</h1>
      <div className="typing">
        <TypingBox timer={timer} />
      </div>
    </div>
  );
};

export default Home;

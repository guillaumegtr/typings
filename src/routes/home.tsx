import React, { useState, useEffect } from 'react';
import { Round } from '../models/round';
import TypingBox from '../components/typing-box';
import ScoreBar from '../components/score-bar';

const Home: React.FC = () => {
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const round = new Round();

  /**
   * Show score and restart round
   */
  const showScore = () => {
    setWPM(round.getWPM());
    setAccuracy(round.getAccuracy());
    round.init();
  };

  return (
    <div className="home">
      <h1 className="title">Typings</h1>
      <div className="typing">
        <ScoreBar wpm={wpm} accuracy={accuracy} />
        <TypingBox currentRound={round} showScore={showScore} />
      </div>
    </div>
  );
};

export default Home;

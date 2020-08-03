import React from 'react';

interface ScoreBarProps {
  wpm: number;
  accuracy: number;
}

const ScoreBar: React.FC<ScoreBarProps> = (props) => {
  const { wpm, accuracy } = props;

  return (
    <div className="score-bar">
      <span>WPM: {wpm}</span>
      {/* TODO: animate letter here */}
      <span></span>
      <span>🎯: {accuracy} %</span>
    </div>
  );
};

export default ScoreBar;

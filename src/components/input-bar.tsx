import React, { useEffect, useState } from 'react';
import { Timer } from '../scripts/timer';
const SEPERATOR = ' ';

interface InputBarProps {
  handleKeyStroke: Function;
  handleRedo: Function;
}

const InputBar: React.FC = (props: InputBarProps) => {
  const { handleKeyStroke, handleRedo } = props;
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setUserInput(userInput.includes(' ') ? '' : userInput);
  }, [userInput]);

  const handleKeyDown = (e) => {
    if (e.key === SEPERATOR && userInput.length > 0) {
      handleKeyStroke(userInput);
      setUserInput('');
    }

    const timer = Timer.getInstance();

    // start timer on first input
    if (!timer.isStarted()) {
      console.log('starting timer...');
      timer.start();
      setInterval(() => {
        console.log(timer.getTime());
      }, 1000);
    }
  };

  const handleClick = () => {
    handleRedo();
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        tabIndex={1}
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="redo-button primary" onClick={handleClick}>
        Redo
      </button>
    </div>
  );
};

export default InputBar;

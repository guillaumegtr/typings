import React, { useEffect, useState, useRef } from 'react';
import { Timer } from '../models/timer';
import { Round } from '../models/round';
const SEPERATOR = ' ';
const excludedChars = [
  'SHIFT',
  'CONTROL',
  'ALT',
  'BACKSPACE',
  'ENTER',
  'DELETE',
  'HOME',
  'END',
  'ESCAPE',
];

interface InputBarProps {
  handleKeyStroke: Function;
  handleRedo: Function;
  round: Round;
  isDone: boolean;
}

const InputBar: React.FC<InputBarProps> = (props: InputBarProps) => {
  const { handleKeyStroke, handleRedo, round } = props;
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);
  const timer = Timer.getInstance();

  useEffect(() => {
    setUserInput(userInput.includes(' ') ? '' : userInput);
  }, [userInput]);

  const isKeyStroke = (key: string) => {
    return key === SEPERATOR && userInput.length > 0;
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if (isKeyStroke(key)) {
      handleKeyStroke(userInput);
      setUserInput('');
    }
    if (!excludedChars.includes(key.toUpperCase())) {
      round.countEntry();
    }
    if (!timer.isStarted() && !isKeyStroke(key)) {
      timer.start();
    }
  };

  const handleClick = () => {
    inputRef.current.focus();
    setUserInput('');
    handleRedo(true);
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
        ref={inputRef}
      />
      <button className="redo-button primary" onClick={handleClick}>
        Redo
      </button>
    </div>
  );
};

export default InputBar;

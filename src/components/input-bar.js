import React, { useEffect, useState } from 'react';
const SEPERATOR = ' ';

export default function InputBar(props) {
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
}

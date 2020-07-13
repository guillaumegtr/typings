import React, { useEffect, useState } from 'react';
const SEPERATOR = ' ';

export default function InputBar(props) {
  const { handleKeyStroke } = props;
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
      <button className="redo-button primary">Redo</button>
    </div>
  );
}

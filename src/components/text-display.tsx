import React, { useState, useEffect } from 'react';

interface TextDisplayProps {
  words: Array<string>;
}

const TextDisplay = (props: TextDisplayProps) => {
  const { words } = props;
  const [wordList, setWorldList] = useState(['']);

  useEffect(() => {
    setWorldList(words);
  }, [words]);

  return (
    <div>
      {wordList.map((word, i) => (
        <span key={i} className={word.className}>
          {word.value}
        </span>
      ))}
    </div>
  );
};

export default TextDisplay;

import React, { useState, useEffect } from 'react';

export default function TextDisplay(props) {
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
}

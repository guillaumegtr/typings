import React, { useState, useEffect } from 'react';

export default function TextDisplay(props) {
  const { text } = props;
  const [displayWords, setDisplayWords] = useState(['']);
  useEffect(() => {
    const words = text.split(' ');
    let formattedWords = words.map((word, i) => {
      console.log(i, text.split(' ').length);
      return {
        // add space till last word
        value: `${word}${i < words.length - 1 ? ' ' : ''}`,
        cssClass: 'default' || 'current',
      };
    });

    setDisplayWords(formattedWords);
  }, [text]);

  return (
    <div>
      {displayWords.map((word, i) => (
        <span key={i} className={word.cssClass}>
          {word.value}
        </span>
      ))}
    </div>
  );
}

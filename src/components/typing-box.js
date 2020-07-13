import React, { useState, useEffect } from 'react';
import TextDisplay from './text-display';
import InputBar from './input-bar';

export default function TypingBox() {
  const [text, setText] = useState('');
  const [formattedWords, setFormattedWords] = useState(['']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setText('with own hold great stand ask without group one now');
    const words = text.split(' ');
    let formattedWords = words.map((word, i) => {
      return {
        value: `${word}${i < words.length - 1 ? ' ' : ''}`,
        className: currentWordIndex === i ? 'current' : undefined,
      };
    });
    setFormattedWords(formattedWords);
  }, [text]);

  const handleKeyStroke = (keyStroke) => {
    let nextWordIndex = currentWordIndex;
    let a = currentWordIndex;
    if (isNotLastWord()) {
      keyStroke = keyStroke.concat(' ');
      nextWordIndex++;
      formattedWords[nextWordIndex].className = 'current';
    } else {
      setIsDone(true);
    }

    if (keyStroke === formattedWords[a].value) {
      formattedWords[currentWordIndex].className = 'done';
    } else {
      formattedWords[currentWordIndex].className = 'error';
    }

    setCurrentWordIndex(nextWordIndex);
  };

  const isNotLastWord = () => {
    return currentWordIndex < formattedWords.length - 1;
  };

  return (
    <div className="typing-box card">
      <TextDisplay words={formattedWords} currentWord={currentWord} />
      <InputBar handleKeyStroke={handleKeyStroke} />
    </div>
  );
}

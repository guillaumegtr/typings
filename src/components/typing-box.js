import React, { useState, useEffect } from 'react';
import TextDisplay from './text-display';
import InputBar from './input-bar';

export default function TypingBox() {
  const [text, setText] = useState('');
  const [formattedWords, setFormattedWords] = useState(['']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const getText = () => {
    // TODO: get from api
    setText('with own hold great stand ask without group one now');
  };

  const formatWords = (words, isReset) => {
    let index = 0;
    if (isReset) {
      setIsDone(false);
      setCurrentWordIndex(0);
      index = 0;
    } else {
      index = currentWordIndex;
    }
    return words.map((word, i) => {
      return {
        value: `${word}${i < words.length - 1 ? ' ' : ''}`,
        className: index === i ? 'current' : undefined,
      };
    });
  };

  const reset = () => {
    setIsDone(true);
    getText();
  };

  useEffect(() => {
    getText();
  }, []);

  useEffect(() => {
    const words = text.split(' ');

    let formattedWords = formatWords(words, isDone);
    setFormattedWords(formattedWords);
  }, [text, isDone]);

  const handleKeyStroke = (keyStroke) => {
    let nextWordIndex = currentWordIndex;
    if (isNotLastWord()) {
      keyStroke = keyStroke.concat(' ');
      nextWordIndex++;
      formattedWords[nextWordIndex].className = 'current';
    } else {
      // done
      reset();
    }

    if (keyStroke === formattedWords[currentWordIndex].value) {
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
      <TextDisplay words={formattedWords} />
      <InputBar handleKeyStroke={handleKeyStroke} handleRedo={reset} />
    </div>
  );
}

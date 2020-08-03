import React, { useState, useEffect } from 'react';
import TextDisplay from './text-display';
import InputBar from './input-bar';
import { Timer } from '../scripts/timer';
import { Round } from '../models/round';

interface TypingBoxProps {
  currentRound: Round;
  showScore: Function;
}

const TypingBox: React.FC<TypingBoxProps> = (props) => {
  const { currentRound, showScore } = props;
  const [text, setText] = useState('');
  const [formattedWords, setFormattedWords] = useState(['']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const timer = Timer.getInstance();

  const getText = () => {
    // TODO: get from api
    setText('with own hold great stand ask without group one now');
  };

  const formatWords = (words, isReset): [] => {
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

  const reset = (isButton?: boolean) => {
    setIsDone(true);
    getText();
    timer.pause();
    if (!isButton) {
      currentRound.calculateWPM(timer.getTime());
    }
    showScore();
  };

  useEffect(() => {
    getText();
  }, []);

  useEffect(() => {
    const words = text.split(' ');
    let formattedWords = formatWords(words, isDone);
    setFormattedWords(formattedWords);
    currentRound.setWordCount(formattedWords.length);
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
      currentRound.addError();
    }

    setCurrentWordIndex(nextWordIndex);
  };

  const isNotLastWord = () => {
    return currentWordIndex < formattedWords.length - 1;
  };

  return (
    <div className="typing-box card">
      <TextDisplay words={formattedWords} />
      <InputBar
        handleKeyStroke={handleKeyStroke}
        handleRedo={reset}
        round={currentRound}
      />
    </div>
  );
};

export default TypingBox;

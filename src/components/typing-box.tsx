import React, { useState, useEffect } from 'react';
import TextDisplay from './text-display';
import InputBar from './input-bar';
import { Timer } from '../models/timer';
import { Round } from '../models/round';
import { Word } from '../models/word';

interface TypingBoxProps {
  currentRound: Round;
  showScore: Function;
}

const TypingBox: React.FC<TypingBoxProps> = (props: TypingBoxProps) => {
  const { currentRound, showScore } = props;
  const [text, setText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<Word[]>();

  const timer = Timer.getInstance();

  const initText = () => {
    const text = 'with own hold great stand ask without group one now';
    setText(text);
    setCurrentWordIndex(0);
    initWords(text.split(' '));
    currentRound.setWordCount(text.split(' ').length);
  };

  const initWords = (words: string[]) => {
    const newWords = words.map((word, i) => {
      let w = new Word(word);
      if (i == 0) {
        w.className = 'current';
      }
      return w;
    });
    setWords(newWords);
  };

  const reset = (isButton?: boolean) => {
    timer.pause();
    if (!isButton) {
      currentRound.calculateWPM(timer.getTime());
    }
    showScore();
    initText();
  };

  useEffect(() => {
    initText();
  }, []);

  const handleKeyStroke = (keyStroke) => {
    if (keyStroke !== words[currentWordIndex].value) {
      words[currentWordIndex].className = 'error';
      currentRound.addError();
    } else if (keyStroke === words[currentWordIndex].value) {
      words[currentWordIndex].className = 'done';
    }

    if (isNotLastWord()) {
      words[currentWordIndex + 1].className = 'current';
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // done
      reset();
    }
  };

  const isNotLastWord = () => {
    return currentWordIndex < words.length - 1;
  };

  return (
    <div className="typing-box card">
      {words && <TextDisplay words={words} />}
      <InputBar
        handleKeyStroke={handleKeyStroke}
        handleRedo={reset}
        round={currentRound}
      />
    </div>
  );
};

export default TypingBox;

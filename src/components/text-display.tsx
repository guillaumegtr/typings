import React from 'react';
import DisplayWord from './display-word';
import { Word } from '../models/word';

interface TextDisplayProps {
  words: Array<Word>;
}

const TextDisplay = (props: TextDisplayProps) => {
  const { words } = props;
  const wordCount = words.length - 1;

  return (
    <div>
      {words.map((word, i) => (
        <DisplayWord index={i} word={word} isLast={i == wordCount} />
      ))}
    </div>
  );
};

export default TextDisplay;

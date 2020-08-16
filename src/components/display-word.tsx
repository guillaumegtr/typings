import React from 'react';
import { Word } from '../models/word';

interface DisplayWordProps {
  word: Word;
  index: number;
  isLast: boolean;
}

const DisplayWord = (props: DisplayWordProps) => {
  const { word, index, isLast } = props;

  const { value, className } = word;

  return (
    <span key={index} className={className}>
      {value}
      {!isLast && ' '}
    </span>
  );
};

export default DisplayWord;

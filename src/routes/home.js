import React from 'react';
import TypingBox from '~/components/typing-box';

export default function Home() {
  return (
    <div className="home">
      <h1 className="title">Typings</h1>
      <div className="typing">
        <TypingBox />
      </div>
    </div>
  );
}

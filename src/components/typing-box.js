import React, { useState } from 'react';
import TextDisplay from './text-display';

export default function TypingBox() {
  // TODO: get random text from api
  const text = 'with own hold great stand ask without group one now';

  return (
    <div className="typing-box card">
      <TextDisplay text={text} />
    </div>
  );
}

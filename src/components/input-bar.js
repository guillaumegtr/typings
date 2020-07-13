import React from 'react';

export default function InputBar() {
  return (
    <div className="input-bar">
      <input
        type="text"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        tabIndex={1}
      />
      <button className="redo-button primary">Redo</button>
    </div>
  );
}

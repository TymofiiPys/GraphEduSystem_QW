import React from 'react';
import './PseudoCodeHighlighter.css';

export default function PseudoCodeHighlighter({ codeLines, currentLine }) {
    return (
        <pre className="pseudocode-block">
      {codeLines.map((line, index) => (
          <div
              key={index}
              className={`pseudocode-line ${index === currentLine ? 'highlighted' : ''}`}
          >
              {line}
          </div>
      ))}
    </pre>
    );
}

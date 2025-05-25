import React from "react";
import "./PseudoCodeHighlighter.css";
import Draggable from "react-draggable";

export default function PseudoCodeHighlighter({ codeLines, currentLine, params }) {
  const windowRef = React.useRef(null);

  return (
    <Draggable nodeRef={windowRef}>
      <pre className="pseudocode-block" ref={windowRef}>
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`pseudocode-line ${
              index === currentLine ? "highlighted" : ""
            }`}
          >
            {index === currentLine ? line + " (" + params + ")": line}
          </div>
        ))}
      </pre>
    </Draggable>
  );
}

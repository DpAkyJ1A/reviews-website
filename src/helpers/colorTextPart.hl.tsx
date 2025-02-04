import React from "react";

export function colorTextPart({ text, isBreak }: { text: string, isBreak?: boolean }) {
  const regex = /\[([^\]]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        gradient: false,
      });
    }
    parts.push({
      text: match[1],
      gradient: true,
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      gradient: false,
    });
  }

  return parts.map((part, index) =>
    part.gradient ? (
      <React.Fragment key={`${text} - ${index}`}>
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              filter: "blur(70px)",
              background: "linear-gradient(90.47deg, #1E8DFF 0%, #9D72FF 25%, #FF47AB 50%, #FF386B 74.5%, #FF8100 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              zIndex: -2,
            }}
          >
            {part.text}
          </span>
          <span
            style={{
              position: "absolute",
              top: "4px",
              left: "0px",
              filter: "blur(40px)",
              background: "linear-gradient(90.47deg, #1E8DFF 0%, #9D72FF 25%, #FF47AB 50%, #FF386B 74.5%, #FF8100 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              zIndex: -1,
            }}
          >
            {part.text}
          </span>
          <span
            style={{
              background: "linear-gradient(90.47deg, #1E8DFF 0%, #9D72FF 25%, #FF47AB 50%, #FF386B 74.5%, #FF8100 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1,
            }}
          >
            {part.text}
          </span>
        </span>
        {isBreak && index < parts.length - 1 && <br />}
      </React.Fragment>
    ) : (
      <React.Fragment key={`${text} - ${index}`}>
        <span>{part.text}</span>
        {isBreak && index < parts.length - 1 && <br />}
      </React.Fragment>
    )
  );
}

export function colorTextPart(inputText: string) {
  const regex = /\[([^\]]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(inputText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: inputText.slice(lastIndex, match.index),
        gradient: false,
      });
    }
    parts.push({
      text: match[1],
      gradient: true,
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < inputText.length) {
    parts.push({
      text: inputText.slice(lastIndex),
      gradient: false,
    });
  }

  return parts.map((part, index) =>
    part.gradient ? (
      <span
        key={index}
        style={{
          background: "linear-gradient(90.47deg, #1E8DFF 0%, #9D72FF 25%, #FF47AB 50%, #FF386B 74.5%, #FF8100 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    )
  );
}

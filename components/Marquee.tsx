// A ribbon of words that scrolls sideways and pauses on hover.
export default function Marquee({ words }: { words: string[] }) {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="marquee-item">
          {w}
          <span className="marquee-dot">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="marquee" aria-label={words.join(", ")}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

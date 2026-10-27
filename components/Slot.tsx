// Image placeholder. Swap for <Image src=... /> once you have real shots.
export default function Slot({
  label,
  note,
  className = "",
}: {
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={`slot ${className}`}>
      <span className="slot-label">{label}</span>
      {note && <span className="slot-note">{note}</span>}
    </div>
  );
}

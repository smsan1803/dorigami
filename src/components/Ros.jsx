// Origami rozeta iz SVG spritea (definiran u index.html)
export default function Ros({ className, style }) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href="#ros" />
    </svg>
  );
}

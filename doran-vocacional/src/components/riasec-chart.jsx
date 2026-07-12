import { RIASEC_LABELS } from "@/lib/assessment";

const AXES = ["R", "I", "A", "S", "E", "C"];
const CENTER = 160;
const RADIUS = 112;

function point(index, radius) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / AXES.length;
  return [CENTER + Math.cos(angle) * radius, CENTER + Math.sin(angle) * radius];
}

function polygonPoints(radius) {
  return AXES.map((_, index) => point(index, radius).join(",")).join(" ");
}

export function RiasecChart({ scores }) {
  const dataPoints = scores.map((score, index) => point(index, (score / 5) * RADIUS).join(",")).join(" ");
  return (
    <figure className="grid gap-4" aria-labelledby="riasec-chart-title">
      <figcaption id="riasec-chart-title" className="sr-only">Gráfico radial das seis dimensões RIASEC</figcaption>
      <svg viewBox="0 0 320 320" role="img" aria-label={`Pontuações: ${AXES.map((axis, index) => `${RIASEC_LABELS[axis]} ${scores[index].toFixed(1)}`).join(", ")}`} className="mx-auto w-full max-w-[360px] overflow-visible">
        {[0.25, 0.5, 0.75, 1].map((step) => <polygon key={step} points={polygonPoints(RADIUS * step)} fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />)}
        {AXES.map((axis, index) => {
          const [x, y] = point(index, RADIUS);
          const [labelX, labelY] = point(index, RADIUS + 30);
          return <g key={axis}><line x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" /><text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[11px] font-semibold">{axis}</text></g>;
        })}
        <polygon points={dataPoints} fill="rgba(154,182,208,0.20)" stroke="#a8c0d5" strokeWidth="2.5" strokeLinejoin="round" />
        {scores.map((score, index) => {
          const [x, y] = point(index, (score / 5) * RADIUS);
          return <circle key={AXES[index]} cx={x} cy={y} r="4.5" fill="#d7e3ec" stroke="#172636" strokeWidth="2" />;
        })}
      </svg>
    </figure>
  );
}

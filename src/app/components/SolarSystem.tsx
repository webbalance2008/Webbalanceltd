interface SolarSystemProps {
  accentColor: string;
}

export function SolarSystem({ accentColor }: SolarSystemProps) {
  const cx = 420;
  const cy = 420;
  const size = 840;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.5,
        zIndex: 1,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          {/* Sun glow filter */}
          <filter id="sunGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Planet glow */}
          <filter id="planetGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle glow for orbit rings */}
          <filter id="ringGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Orbital rings ── */}
        {/* Orbit 1 — r55 */}
        <circle cx={cx} cy={cy} r={55}  fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        {/* Orbit 2 — r100 */}
        <circle cx={cx} cy={cy} r={100} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
        {/* Orbit 3 — r155 */}
        <circle cx={cx} cy={cy} r={155} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
        {/* Orbit 4 — r215 */}
        <circle cx={cx} cy={cy} r={215} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
        {/* Orbit 5 — r290 */}
        <circle cx={cx} cy={cy} r={290} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 8" />
        {/* Orbit 6 — r360 (outermost, dashed) */}
        <circle cx={cx} cy={cy} r={360} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 12" />

        {/* ── Sun ── */}
        <circle cx={cx} cy={cy} r={40} fill={`${accentColor}08`} />
        <circle cx={cx} cy={cy} r={22} fill={`${accentColor}18`} />
        <circle cx={cx} cy={cy} r={10} fill={`${accentColor}60`} filter="url(#sunGlow)">
          <animate attributeName="r" values="9;11;9" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r={5} fill="white" opacity="0.9" filter="url(#sunGlow)">
          <animate attributeName="r" values="4.5;5.5;4.5" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ── Planet 1 — orbit r55, period 8s (tiny, quick) ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="8s" repeatCount="indefinite" />
          <circle cx={cx + 55} cy={cy} r={2.5} fill="white" opacity="0.75" filter="url(#planetGlow)" />
        </g>

        {/* ── Planet 2 — orbit r100, period 14s (with a moon) ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="14s" repeatCount="indefinite" />
          <circle cx={cx + 100} cy={cy} r={3.5} fill={accentColor} opacity="0.7" filter="url(#planetGlow)">
            <animate attributeName="opacity" values="0.6;0.85;0.6" dur="7s" repeatCount="indefinite" />
          </circle>
          {/* Moon orbiting planet 2 */}
          <g transform={`translate(${cx + 100}, ${cy})`}>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" additive="sum" />
            <circle cx={14} cy={0} r={1.2} fill="white" opacity="0.55" />
          </g>
        </g>

        {/* ── Planet 3 — orbit r155, period 24s ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`180 ${cx} ${cy}`} to={`540 ${cx} ${cy}`} dur="24s" repeatCount="indefinite" />
          <circle cx={cx + 155} cy={cy} r={3} fill="rgba(255,255,255,0.6)" filter="url(#planetGlow)" />
        </g>

        {/* ── Planet 4 — orbit r215, period 40s (larger, accent-tinted) ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`90 ${cx} ${cy}`} to={`450 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
          <circle cx={cx + 215} cy={cy} r={5} fill="rgba(255,255,255,0.15)" stroke={accentColor} strokeWidth="1" opacity="0.8" filter="url(#planetGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx + 215} cy={cy} r={2.5} fill={accentColor} opacity="0.6" />
          {/* Moon orbiting planet 4 */}
          <g transform={`translate(${cx + 215}, ${cy})`}>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="5s" repeatCount="indefinite" additive="sum" />
            <circle cx={18} cy={0} r={1.5} fill="rgba(255,255,255,0.5)" />
          </g>
          {/* Second moon */}
          <g transform={`translate(${cx + 215}, ${cy})`}>
            <animateTransform attributeName="transform" type="rotate" from="180 0 0" to="-180 0 0" dur="8s" repeatCount="indefinite" additive="sum" />
            <circle cx={26} cy={0} r={1} fill="rgba(255,255,255,0.3)" />
          </g>
        </g>

        {/* ── Planet 5 — orbit r290, period 65s (distant, tiny) ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`270 ${cx} ${cy}`} to={`630 ${cx} ${cy}`} dur="65s" repeatCount="indefinite" />
          <circle cx={cx + 290} cy={cy} r={2} fill="rgba(255,255,255,0.45)" />
        </g>

        {/* ── Planet 6 — orbit r290 (opposite side, 65s offset) ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`45 ${cx} ${cy}`} to={`405 ${cx} ${cy}`} dur="65s" repeatCount="indefinite" />
          <circle cx={cx + 290} cy={cy} r={1.5} fill={`${accentColor}88`} />
        </g>

        {/* ── Outer slow body — orbit r360, period 120s ── */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="120s" repeatCount="indefinite" />
          <circle cx={cx + 360} cy={cy} r={2.5} fill="rgba(255,255,255,0.25)" filter="url(#planetGlow)" />
        </g>

        {/* ── Asteroid cluster — orbit r290, 3 tiny rocks ── */}
        {[0, 120, 240].map((startAngle, i) => (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`${startAngle} ${cx} ${cy}`}
              to={`${startAngle + 360} ${cx} ${cy}`}
              dur={`${80 + i * 8}s`}
              repeatCount="indefinite"
            />
            <circle cx={cx + 240 + (i % 2 === 0 ? 4 : -4)} cy={cy + (i === 1 ? 3 : 0)} r={1} fill="rgba(255,255,255,0.2)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
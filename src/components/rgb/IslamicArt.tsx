interface ArtProps {
  idPrefix?: string;
}

/** Hero artwork: an RGB-lit mosque skyline built from domes, minarets and arcades. */
export function IslamicArchitecture({ idPrefix = "arch" }: ArtProps) {
  const sky = `${idPrefix}-sky`;
  const dome = `${idPrefix}-dome`;
  const base = `${idPrefix}-base`;
  const stars = `${idPrefix}-stars`;
  const glow = `${idPrefix}-glow`;
  const arches = [130, 290, 450, 610, 770, 930];

  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff2d6f" stopOpacity="0.38" />
          <stop offset="48%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.46" />
        </linearGradient>
        <linearGradient id={dome} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5f8f" />
          <stop offset="46%" stopColor="#25d366" />
          <stop offset="100%" stopColor="#4f8cff" />
        </linearGradient>
        <linearGradient id={base} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1e33" />
          <stop offset="100%" stopColor="#03080f" />
        </linearGradient>
        <radialGradient id={glow} cx="52%" cy="16%" r="72%">
          <stop offset="0%" stopColor="#4f8cff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#03080f" stopOpacity="0" />
        </radialGradient>
        <pattern id={stars} width="90" height="90" patternUnits="userSpaceOnUse">
          <path
            d="M45 6 58 32 84 45 58 58 45 84 32 58 6 45 32 32Z"
            fill="none"
            stroke="#eafff5"
            strokeOpacity="0.16"
            strokeWidth="1.4"
          />
          <path
            d="M45 22 68 45 45 68 22 45Z"
            fill="none"
            stroke="#eafff5"
            strokeOpacity="0.11"
            strokeWidth="1.2"
          />
          <circle cx="45" cy="45" r="3" fill="#eafff5" fillOpacity="0.22" />
        </pattern>
      </defs>

      <rect width="1200" height="520" fill="#03080f" />
      <rect width="1200" height="520" fill={`url(#${glow})`} />
      <rect width="1200" height="520" fill={`url(#${sky})`} />
      <rect width="1200" height="520" fill={`url(#${stars})`} />

      {/* Minarets */}
      <g stroke={`url(#${dome})`} strokeWidth="2.4">
        <rect x="150" y="170" width="34" height="270" rx="6" fill={`url(#${base})`} />
        <path d="M167 96 196 170H138Z" fill={`url(#${dome})`} />
        <circle cx="167" cy="86" r="7" fill="#fbbf24" />
        <rect x="137" y="232" width="60" height="10" rx="4" fill={`url(#${dome})`} />
        <rect x="137" y="320" width="60" height="10" rx="4" fill={`url(#${dome})`} />

        <rect x="1016" y="170" width="34" height="270" rx="6" fill={`url(#${base})`} />
        <path d="M1033 96 1062 170H1004Z" fill={`url(#${dome})`} />
        <circle cx="1033" cy="86" r="7" fill="#fbbf24" />
        <rect x="1003" y="232" width="60" height="10" rx="4" fill={`url(#${dome})`} />
        <rect x="1003" y="320" width="60" height="10" rx="4" fill={`url(#${dome})`} />
      </g>

      {/* Side domes */}
      <g stroke={`url(#${dome})`} strokeWidth="3">
        <path d="M292 382 Q292 296 360 296 Q428 296 428 382Z" fill={`url(#${base})`} />
        <path d="M772 382 Q772 296 840 296 Q908 296 908 382Z" fill={`url(#${base})`} />
      </g>
      <g stroke="#eafff5" strokeOpacity="0.28" strokeWidth="2" fill="none">
        <path d="M360 298 V382M360 298 Q330 336 330 382M360 298 Q390 336 390 382" />
        <path d="M840 298 V382M840 298 Q810 336 810 382M840 298 Q870 336 870 382" />
      </g>
      <circle cx="360" cy="284" r="7" fill="#fbbf24" />
      <circle cx="840" cy="284" r="7" fill="#fbbf24" />

      {/* Central dome */}
      <path
        d="M480 382 Q480 244 600 244 Q720 244 720 382Z"
        fill={`url(#${dome})`}
        fillOpacity="0.92"
        stroke="#eafff5"
        strokeOpacity="0.5"
        strokeWidth="3"
      />
      <g stroke="#eafff5" strokeOpacity="0.42" strokeWidth="2" fill="none">
        <path d="M600 246 V382" />
        <path d="M600 246 Q540 300 540 382M600 246 Q660 300 660 382" />
        <path d="M600 246 Q500 320 500 382M600 246 Q700 320 700 382" />
      </g>
      <line x1="600" y1="246" x2="600" y2="194" stroke="#fbbf24" strokeWidth="4" />
      <circle cx="600" cy="184" r="10" fill="#fbbf24" />

      {/* Prayer hall and arcade */}
      <path d="M90 382 H1110 V520 H90Z" fill={`url(#${base})`} />
      <g fill="#03080f" stroke={`url(#${dome})`} strokeWidth="2.6">
        {arches.map((x) => (
          <path
            key={x}
            d={`M${x} 520 V438 Q${x} 398 ${x + 60} 398 Q${x + 120} 398 ${x + 120} 438 V520 Z`}
          />
        ))}
      </g>
      <g fill={`url(#${dome})`} fillOpacity="0.55">
        {arches.map((x) => (
          <path
            key={`light-${x}`}
            d={`M${x + 18} 520 V446 Q${x + 18} 416 ${x + 60} 416 Q${x + 102} 416 ${x + 102} 446 V520 Z`}
          />
        ))}
      </g>
      <rect x="90" y="500" width="1020" height="20" fill="#03080f" />
    </svg>
  );
}

/** Decorative eight-point star tessellation used in the architecture section. */
export function GeometricPattern({ idPrefix = "geo" }: ArtProps) {
  const pattern = `${idPrefix}-pattern`;
  const wash = `${idPrefix}-wash`;

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={wash} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#22c55e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ff2d6f" stopOpacity="0.22" />
        </radialGradient>
        <pattern id={pattern} width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M40 4 52 28 76 40 52 52 40 76 28 52 4 40 28 28Z"
            fill="none"
            stroke="#eafff5"
            strokeOpacity="0.3"
            strokeWidth="1.3"
          />
          <path
            d="M40 18 62 40 40 62 18 40Z"
            fill="none"
            stroke="#eafff5"
            strokeOpacity="0.18"
            strokeWidth="1.1"
          />
          <circle cx="40" cy="40" r="3.5" fill="#fbbf24" fillOpacity="0.7" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#050d19" />
      <rect width="400" height="400" fill={`url(#${wash})`} />
      <rect width="400" height="400" fill={`url(#${pattern})`} />
      <circle cx="200" cy="200" r="118" fill="none" stroke="#eafff5" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="200" cy="200" r="88" fill="none" stroke="#eafff5" strokeOpacity="0.14" strokeWidth="1.5" />
    </svg>
  );
}

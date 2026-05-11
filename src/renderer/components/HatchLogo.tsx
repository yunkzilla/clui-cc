import React from 'react'

interface Props {
  size?: number
  /** Stroke color; defaults to currentColor */
  color?: string
  /** Accent color used for the inner hub. Defaults to the same color. */
  accentColor?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Hatch logo — a stylized porthole / submarine hatch wheel.
 * Reads as "an opening you can summon Claude through."
 *
 * Geometry: 32×32 viewBox.
 *   - Outer hatch frame (circle, stroked)
 *   - 4 rivets at compass-NW/NE/SW/SE positions
 *   - Cross-spoke wheel handle reaching to a filled center hub
 *
 * Designed to read clearly at 24–28px in the floating-icon puck and
 * still hold up scaled to 1024px for app-icon use.
 */
export function HatchLogo({ size = 28, color, accentColor, className, style }: Props) {
  const stroke = color ?? 'currentColor'
  const hub = accentColor ?? stroke
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Hatch"
      className={className}
      style={style}
    >
      {/* Outer hatch frame */}
      <circle cx="16" cy="16" r="12.5" />

      {/* Rivets — small filled dots at the four diagonal compass points */}
      <circle cx="7.5" cy="7.5" r="0.9" fill={stroke} stroke="none" />
      <circle cx="24.5" cy="7.5" r="0.9" fill={stroke} stroke="none" />
      <circle cx="7.5" cy="24.5" r="0.9" fill={stroke} stroke="none" />
      <circle cx="24.5" cy="24.5" r="0.9" fill={stroke} stroke="none" />

      {/* Wheel-handle spokes — reach from frame edge inward to the central hub */}
      <line x1="16" y1="4.5" x2="16" y2="13.5" />
      <line x1="16" y1="18.5" x2="16" y2="27.5" />
      <line x1="4.5" y1="16" x2="13.5" y2="16" />
      <line x1="18.5" y1="16" x2="27.5" y2="16" />

      {/* Central hub — filled with the accent color */}
      <circle cx="16" cy="16" r="2.5" fill={hub} stroke={hub} />
    </svg>
  )
}

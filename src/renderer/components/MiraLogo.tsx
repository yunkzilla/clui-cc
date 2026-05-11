import React from 'react'

interface Props {
  size?: number
  /** Fill color for the M. Defaults to currentColor. */
  color?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Mira logo — bold geometric M wordmark with a softly-rounded V apex.
 * Same letterform used in the app icon (resources/icon.svg) so the brand
 * reads consistently between the Dock icon and the floating puck.
 */
export function MiraLogo({ size = 28, color, className, style }: Props) {
  const fill = color ?? 'currentColor'
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      fill="none"
      aria-label="Mira"
      className={className}
      style={style}
    >
      <path
        d="M 240 240
           L 350 240
           L 488 715
           Q 512 762 536 715
           L 674 240
           L 784 240
           L 784 784
           L 240 784 Z"
        fill={fill}
      />
    </svg>
  )
}

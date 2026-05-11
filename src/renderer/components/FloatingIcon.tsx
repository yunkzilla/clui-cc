import React from 'react'
import { useColors } from '../theme'
import { useSessionStore } from '../stores/sessionStore'
import { MiraLogo } from './MiraLogo'

/**
 * Collapsed window form: a small circular puck the user can drag anywhere
 * on screen, and click to expand back into the full popup.
 *
 * Painted in Mira Deck's brand treatment — near-black plate with a hot
 * amber neon M — so the puck reads consistently with the app icon and pops
 * on any wallpaper regardless of which palette the user has picked.
 *
 * Drag is handled by App.tsx's global handler (any data-clui-ui element is
 * draggable). Click vs. drag is also disambiguated there — a mouseup with
 * negligible movement while in icon mode triggers expand-to-popup.
 */
export function FloatingIcon() {
  const colors = useColors()
  const hasUnread = useSessionStore((s) =>
    s.tabs.some((t) => t.hasUnread || t.permissionQueue.length > 0)
  )
  const isRunning = useSessionStore((s) =>
    s.tabs.some((t) => t.status === 'running' || t.status === 'connecting')
  )

  // Mira Deck brand palette — fixed regardless of theme.
  const PLATE_TOP = '#0c1020'
  const PLATE_BOTTOM = '#03050d'
  const PLATE_BORDER = '#1d2440'
  const NEON = '#ff9a2c'
  const CORE = '#fff3d4'

  const dotColor = isRunning
    ? colors.statusRunning
    : hasUnread
      ? colors.statusComplete
      : null

  return (
    <div
      data-clui-ui
      className="flex items-center justify-center w-full h-full"
      style={{ background: 'transparent' }}
    >
      <div
        className="flex items-center justify-center select-none"
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          background: `radial-gradient(circle at 50% 35%, ${PLATE_TOP}, ${PLATE_BOTTOM})`,
          border: `1px solid ${PLATE_BORDER}`,
          // Inner subtle ring + a very gentle amber accent + grounded drop shadow
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 0 4px rgba(255, 154, 44, 0.12),
            0 3px 10px rgba(0,0,0,0.50)
          `,
          position: 'relative',
        }}
        title="Drag to move · click to expand"
      >
        {/* Amber neon halo behind the M — subtle, not a torch */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'blur(3px)',
            opacity: 0.40,
            pointerEvents: 'none',
          }}
        >
          <MiraLogo size={28} color={NEON} />
        </span>
        {/* Main M — centered in the puck. The deck baseline + cursor live
            only on the full-size app icon; at 56px they were too small to
            read and broke the visual balance. */}
        <MiraLogo size={28} color={CORE} style={{ position: 'relative', zIndex: 1 }} />

        {/* Status notification dot (running / unread) */}
        {dotColor && (
          <span
            className={isRunning ? 'animate-pulse-dot' : ''}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: dotColor,
              boxShadow: `0 0 0 2px ${PLATE_TOP}`,
            }}
          />
        )}
      </div>
    </div>
  )
}

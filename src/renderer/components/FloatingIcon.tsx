import React from 'react'
import { useColors } from '../theme'
import { useSessionStore } from '../stores/sessionStore'
import { MiraLogo } from './MiraLogo'

/**
 * Collapsed window form: a small circular puck the user can drag anywhere
 * on screen, and click to expand back into the full popup.
 *
 * Always rendered in Mira's brand color (Tangerine Tango) so the puck stands
 * out no matter which theme the user has picked.
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

  // Mira brand color — kept fixed regardless of theme so the puck is always
  // unmistakable on any wallpaper.
  const BRAND_BG = '#f25a30'
  const BRAND_BG_DEEP = '#d23a10'
  const BRAND_BORDER = '#b13208'

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
          background: `linear-gradient(180deg, ${BRAND_BG} 0%, ${BRAND_BG_DEEP} 100%)`,
          border: `1px solid ${BRAND_BORDER}`,
          boxShadow: '0 4px 14px rgba(178, 50, 8, 0.45), 0 1px 4px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
        title="Drag to move · click to expand"
      >
        <MiraLogo size={32} color="#ffffff" />
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
              boxShadow: `0 0 0 2px ${BRAND_BG}`,
            }}
          />
        )}
      </div>
    </div>
  )
}

import React from 'react'
import { HeadCircuit } from '@phosphor-icons/react'
import { useColors } from '../theme'
import { useSessionStore } from '../stores/sessionStore'

/**
 * Collapsed window form: a small circular puck the user can drag anywhere
 * on screen, and click to expand back into the full popup.
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
        className="glass-surface flex items-center justify-center select-none"
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          color: colors.textPrimary,
          background: colors.containerBg,
          borderColor: colors.containerBorder,
          boxShadow: colors.cardShadow,
          position: 'relative',
        }}
        title="Drag to move · click to expand"
      >
        <HeadCircuit size={26} weight="duotone" />
        {dotColor && (
          <span
            className={isRunning ? 'animate-pulse-dot' : ''}
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: dotColor,
              boxShadow: `0 0 0 2px ${colors.containerBg}`,
            }}
          />
        )}
      </div>
    </div>
  )
}

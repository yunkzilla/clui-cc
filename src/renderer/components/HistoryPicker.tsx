import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Clock, ChatCircle, X } from '@phosphor-icons/react'
import { useSessionStore } from '../stores/sessionStore'
import { usePopoverLayer } from './PopoverLayer'
import { useColors } from '../theme'
import type { SessionMeta } from '../../shared/types'

function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(isoDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}K`
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`
}

export function HistoryPicker() {
  const resumeSession = useSessionStore((s) => s.resumeSession)
  const isExpanded = useSessionStore((s) => s.isExpanded)
  const activeTab = useSessionStore(
    (s) => s.tabs.find((t) => t.id === s.activeTabId),
    (a, b) => a === b || (!!a && !!b && a.hasChosenDirectory === b.hasChosenDirectory && a.workingDirectory === b.workingDirectory),
  )
  const staticInfo = useSessionStore((s) => s.staticInfo)
  const popoverLayer = usePopoverLayer()
  const colors = useColors()
  const effectiveProjectPath = activeTab?.hasChosenDirectory
    ? activeTab.workingDirectory
    : (staticInfo?.homePath || activeTab?.workingDirectory || '~')

  const [open, setOpen] = useState(false)
  const [sessions, setSessions] = useState<SessionMeta[]>([])
  const [loading, setLoading] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ right: number; top?: number; bottom?: number; maxHeight?: number }>({ right: 0 })

  const updatePos = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    if (isExpanded) {
      const top = rect.bottom + 6
      setPos({
        top,
        right: window.innerWidth - rect.right,
        maxHeight: window.innerHeight - top - 12,
      })
    } else {
      setPos({
        bottom: window.innerHeight - rect.top + 6,
        right: window.innerWidth - rect.right,
      })
    }
  }, [isExpanded])

  const loadSessions = useCallback(async () => {
    setLoading(true)
    try {
      const result = await window.clui.listSessions(effectiveProjectPath)
      setSessions(result)
    } catch {
      setSessions([])
    }
    setLoading(false)
  }, [effectiveProjectPath])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleToggle = () => {
    if (!open) {
      updatePos()
      void loadSessions()
    }
    setOpen((o) => !o)
  }

  const handleSelect = (session: SessionMeta) => {
    setOpen(false)
    const title = session.firstMessage
      ? (session.firstMessage.length > 30 ? session.firstMessage.substring(0, 27) + '...' : session.firstMessage)
      : session.slug || 'Resumed'
    void resumeSession(session.sessionId, title, effectiveProjectPath)
  }

  const handleDelete = async (sessionId: string) => {
    // Optimistic remove so the row disappears immediately.
    setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId))
    try {
      const res = await window.clui.deleteSession(sessionId, effectiveProjectPath)
      if (!res?.ok) {
        // Reload from disk to undo the optimistic remove on failure.
        void loadSessions()
      }
    } catch {
      void loadSessions()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors"
        style={{ color: colors.textTertiary }}
        title="Resume a previous session"
      >
        <Clock size={13} />
      </button>

      {popoverLayer && open && createPortal(
        <motion.div
          ref={popoverRef}
          data-clui-ui
          initial={{ opacity: 0, y: isExpanded ? -4 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isExpanded ? -4 : 4 }}
          transition={{ duration: 0.12 }}
          className="rounded-xl"
          style={{
            position: 'fixed',
            ...(pos.top != null ? { top: pos.top } : {}),
            ...(pos.bottom != null ? { bottom: pos.bottom } : {}),
            right: pos.right,
            width: 280,
            pointerEvents: 'auto',
            background: colors.popoverBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: colors.popoverShadow,
            border: `1px solid ${colors.popoverBorder}`,
            ...(pos.maxHeight != null ? { maxHeight: pos.maxHeight } : {}),
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column' as const,
          }}
        >
          <div className="px-3 py-2 text-[11px] font-medium flex-shrink-0" style={{ color: colors.textTertiary, borderBottom: `1px solid ${colors.popoverBorder}` }}>
            Recent Sessions
          </div>

          <div className="overflow-y-auto py-1" style={{ maxHeight: pos.maxHeight != null ? undefined : 180 }}>
            {loading && (
              <div className="px-3 py-4 text-center text-[11px]" style={{ color: colors.textTertiary }}>
                Loading...
              </div>
            )}

            {!loading && sessions.length === 0 && (
              <div className="px-3 py-4 text-center text-[11px]" style={{ color: colors.textTertiary }}>
                No previous sessions found
              </div>
            )}

            {!loading && sessions.map((session) => (
              <div
                key={session.sessionId}
                className="group/sess relative w-full flex items-start gap-2.5 px-3 py-2 transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = colors.surfaceHover }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(session)}
                  className="flex items-start gap-2.5 text-left min-w-0 flex-1 cursor-pointer"
                  style={{ background: 'transparent', border: 'none', padding: 0 }}
                  title="Resume this session"
                >
                  <ChatCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: colors.textTertiary }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] truncate pr-5" style={{ color: colors.textPrimary }}>
                      {session.firstMessage || session.slug || session.sessionId.substring(0, 8)}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] mt-0.5" style={{ color: colors.textTertiary }}>
                      <span>{formatTimeAgo(session.lastTimestamp)}</span>
                      <span>{formatSize(session.size)}</span>
                      {session.slug && <span className="truncate">{session.slug}</span>}
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); void handleDelete(session.sessionId) }}
                  className="absolute opacity-0 group-hover/sess:opacity-100 transition-opacity duration-100 flex items-center justify-center rounded-full cursor-pointer"
                  style={{
                    top: 8,
                    right: 8,
                    width: 18,
                    height: 18,
                    background: 'transparent',
                    color: colors.textTertiary,
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.statusErrorBg
                    e.currentTarget.style.color = colors.statusError
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = colors.textTertiary
                  }}
                  title="Delete this session"
                  aria-label="Delete session"
                >
                  <X size={11} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>,
        popoverLayer,
      )}
    </>
  )
}

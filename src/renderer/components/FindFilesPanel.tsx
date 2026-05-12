import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { MagnifyingGlass, Folder, FileText, ArrowSquareOut, X } from '@phosphor-icons/react'
import { useSessionStore } from '../stores/sessionStore'
import { usePopoverLayer } from './PopoverLayer'
import { useColors } from '../theme'

interface Hit {
  name: string
  path: string
  isDirectory: boolean
}

/**
 * Spotlight-style file search popover.
 *
 * Anchored to a magnifying-glass button in the tab strip. Debounced
 * mdfind-backed search. Each result row reveals the file/folder in
 * Finder when clicked. Right-edge icon copies the path to clipboard.
 */
export function FindFilesPanel() {
  const isExpanded = useSessionStore((s) => s.isExpanded)
  const popoverLayer = usePopoverLayer()
  const colors = useColors()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [pos, setPos] = useState<{ right: number; top?: number; bottom?: number; maxHeight?: number }>({ right: 0 })

  const updatePos = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const gap = 6
    const margin = 8
    const right = window.innerWidth - rect.right

    if (isExpanded) {
      const top = rect.bottom + gap
      setPos({
        top,
        right,
        maxHeight: Math.max(160, window.innerHeight - top - margin),
      })
    } else {
      setPos({
        bottom: window.innerHeight - rect.top + gap,
        right,
      })
    }
  }, [isExpanded])

  // Close on outside click
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

  // Reposition while open
  useEffect(() => {
    if (!open) return
    let raf = 0
    const tick = () => {
      updatePos()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open, updatePos])

  // Auto-focus the input when the popover opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!open) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const hits = await window.clui.findFiles(query)
        setResults(hits)
        setHasSearched(true)
      } catch {
        setResults([])
        setHasSearched(true)
      } finally {
        setLoading(false)
      }
    }, 220)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, open])

  const handleToggle = () => {
    if (!open) updatePos()
    setOpen((o) => !o)
  }

  const handleReveal = async (hit: Hit) => {
    await window.clui.revealInFinder(hit.path)
  }

  const handleCopyPath = async (e: React.MouseEvent, hit: Hit) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(hit.path)
    } catch {}
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors"
        style={{ color: colors.textTertiary }}
        title="Find files on this Mac"
        aria-label="Find files"
      >
        <MagnifyingGlass size={13} />
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
            width: 360,
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
          {/* Search input */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderBottom: `1px solid ${colors.popoverBorder}` }}
          >
            <MagnifyingGlass size={14} style={{ color: colors.textTertiary }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find files & folders…"
              spellCheck={false}
              autoComplete="off"
              className="flex-1 text-[12px] bg-transparent outline-none border-0"
              style={{ color: colors.textPrimary }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  if (query) setQuery('')
                  else setOpen(false)
                }
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus() }}
                className="flex items-center justify-center rounded-full w-4 h-4"
                style={{ color: colors.textTertiary, background: 'transparent' }}
                aria-label="Clear search"
              >
                <X size={10} weight="bold" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="overflow-y-auto py-1" style={{ maxHeight: pos.maxHeight != null ? pos.maxHeight - 60 : 320 }}>
            {!query && (
              <div className="px-3 py-4 text-center text-[11px]" style={{ color: colors.textTertiary }}>
                Type a name to search your Mac (Spotlight).<br/>
                Click a result to reveal it in Finder.
              </div>
            )}
            {query && loading && (
              <div className="px-3 py-4 text-center text-[11px]" style={{ color: colors.textTertiary }}>
                Searching…
              </div>
            )}
            {query && !loading && hasSearched && results.length === 0 && (
              <div className="px-3 py-4 text-center text-[11px]" style={{ color: colors.textTertiary }}>
                No matches for &ldquo;{query}&rdquo;
              </div>
            )}
            {results.map((hit) => (
              <div
                key={hit.path}
                role="button"
                tabIndex={0}
                onClick={() => handleReveal(hit)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleReveal(hit)
                  }
                }}
                className="group/hit w-full flex items-center gap-2.5 px-3 py-1.5 cursor-pointer transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = colors.surfaceHover }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                title={`Open ${hit.path} in Finder`}
              >
                {hit.isDirectory
                  ? <Folder size={14} className="flex-shrink-0" style={{ color: colors.accent }} weight="fill" />
                  : <FileText size={14} className="flex-shrink-0" style={{ color: colors.textTertiary }} />}
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] truncate" style={{ color: colors.textPrimary }}>{hit.name}</div>
                  <div className="text-[10px] truncate" style={{ color: colors.textTertiary }} title={hit.path}>{hit.path}</div>
                </div>
                <button
                  onClick={(e) => handleCopyPath(e, hit)}
                  className="opacity-0 group-hover/hit:opacity-100 transition-opacity flex-shrink-0 w-5 h-5 flex items-center justify-center rounded"
                  style={{ color: colors.textTertiary, background: 'transparent' }}
                  title="Copy path"
                  aria-label="Copy path"
                >
                  <ArrowSquareOut size={11} />
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

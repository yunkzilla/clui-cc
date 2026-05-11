/**
 * CLUI Design Tokens — Dual theme (dark + light)
 * Colors derived from ChatCN oklch system and design-fixed.html reference.
 */
import { create } from 'zustand'

// ─── Color palettes ───

const darkColors = {
  // Container (glass surfaces)
  containerBg: '#242422',
  containerBgCollapsed: '#21211e',
  containerBorder: '#3b3b36',
  containerShadow: '0 8px 28px rgba(0, 0, 0, 0.35), 0 1px 6px rgba(0, 0, 0, 0.25)',
  cardShadow: '0 2px 8px rgba(0,0,0,0.35)',
  cardShadowCollapsed: '0 2px 6px rgba(0,0,0,0.4)',

  // Surface layers
  surfacePrimary: '#353530',
  surfaceSecondary: '#42423d',
  surfaceHover: 'rgba(255, 255, 255, 0.05)',
  surfaceActive: 'rgba(255, 255, 255, 0.08)',

  // Input
  inputBg: 'transparent',
  inputBorder: '#3b3b36',
  inputFocusBorder: 'rgba(217, 119, 87, 0.4)',
  inputPillBg: '#2a2a27',

  // Text
  textPrimary: '#ccc9c0',
  textSecondary: '#c0bdb2',
  textTertiary: '#76766e',
  textMuted: '#353530',

  // Accent — orange
  accent: '#d97757',
  accentLight: 'rgba(217, 119, 87, 0.1)',
  accentSoft: 'rgba(217, 119, 87, 0.15)',

  // Status dots
  statusIdle: '#8a8a80',
  statusRunning: '#d97757',
  statusRunningBg: 'rgba(217, 119, 87, 0.1)',
  statusComplete: '#7aac8c',
  statusCompleteBg: 'rgba(122, 172, 140, 0.1)',
  statusError: '#c47060',
  statusErrorBg: 'rgba(196, 112, 96, 0.08)',
  statusDead: '#c47060',
  statusPermission: '#d97757',
  statusPermissionGlow: 'rgba(217, 119, 87, 0.4)',

  // Tab
  tabActive: '#353530',
  tabActiveBorder: '#4a4a45',
  tabInactive: 'transparent',
  tabHover: 'rgba(255, 255, 255, 0.05)',

  // User message bubble
  userBubble: '#353530',
  userBubbleBorder: '#4a4a45',
  userBubbleText: '#ccc9c0',

  // Tool card
  toolBg: '#353530',
  toolBorder: '#4a4a45',
  toolRunningBorder: 'rgba(217, 119, 87, 0.3)',
  toolRunningBg: 'rgba(217, 119, 87, 0.05)',

  // Timeline
  timelineLine: '#353530',
  timelineNode: 'rgba(217, 119, 87, 0.2)',
  timelineNodeActive: '#d97757',

  // Scrollbar
  scrollThumb: 'rgba(255, 255, 255, 0.15)',
  scrollThumbHover: 'rgba(255, 255, 255, 0.25)',

  // Stop button
  stopBg: '#ef4444',
  stopHover: '#dc2626',

  // Send button
  sendBg: '#d97757',
  sendHover: '#c96442',
  sendDisabled: 'rgba(217, 119, 87, 0.3)',

  // Popover
  popoverBg: '#292927',
  popoverBorder: '#3b3b36',
  popoverShadow: '0 4px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)',

  // Code block
  codeBg: '#1a1a18',

  // Mic button
  micBg: '#353530',
  micColor: '#c0bdb2',
  micDisabled: '#42423d',

  // Placeholder
  placeholder: '#6b6b60',

  // Disabled button color
  btnDisabled: '#42423d',

  // Text on accent backgrounds
  textOnAccent: '#ffffff',

  // Button hover (CSS-only stack buttons)
  btnHoverColor: '#c0bdb2',
  btnHoverBg: '#302f2d',

  // Accent border variants (replaces hex-alpha concatenation antipattern)
  accentBorder: 'rgba(217, 119, 87, 0.19)',
  accentBorderMedium: 'rgba(217, 119, 87, 0.25)',

  // Permission card (amber)
  permissionBorder: 'rgba(245, 158, 11, 0.3)',
  permissionShadow: '0 2px 12px rgba(245, 158, 11, 0.08)',
  permissionHeaderBg: 'rgba(245, 158, 11, 0.06)',
  permissionHeaderBorder: 'rgba(245, 158, 11, 0.12)',

  // Permission allow (green)
  permissionAllowBg: 'rgba(34, 197, 94, 0.1)',
  permissionAllowHoverBg: 'rgba(34, 197, 94, 0.22)',
  permissionAllowBorder: 'rgba(34, 197, 94, 0.25)',

  // Permission deny (red)
  permissionDenyBg: 'rgba(239, 68, 68, 0.08)',
  permissionDenyHoverBg: 'rgba(239, 68, 68, 0.18)',
  permissionDenyBorder: 'rgba(239, 68, 68, 0.22)',

  // Permission denied card
  permissionDeniedBorder: 'rgba(196, 112, 96, 0.3)',
  permissionDeniedHeaderBorder: 'rgba(196, 112, 96, 0.12)',

  // Diff (Edit tool inline diff)
  diffRemovedBg: 'rgba(248, 81, 73, 0.1)',
  diffAddedBg: 'rgba(63, 185, 80, 0.1)',
} as const

const lightColors = {
  // Container (glass surfaces)
  containerBg: '#f9f8f5',
  containerBgCollapsed: '#f4f2ed',
  containerBorder: '#dddad2',
  containerShadow: '0 8px 28px rgba(0, 0, 0, 0.08), 0 1px 6px rgba(0, 0, 0, 0.04)',
  cardShadow: '0 2px 8px rgba(0,0,0,0.06)',
  cardShadowCollapsed: '0 2px 6px rgba(0,0,0,0.08)',

  // Surface layers
  surfacePrimary: '#edeae0',
  surfaceSecondary: '#dddad2',
  surfaceHover: 'rgba(0, 0, 0, 0.04)',
  surfaceActive: 'rgba(0, 0, 0, 0.06)',

  // Input
  inputBg: 'transparent',
  inputBorder: '#dddad2',
  inputFocusBorder: 'rgba(217, 119, 87, 0.4)',
  inputPillBg: '#ffffff',

  // Text
  textPrimary: '#3c3929',
  textSecondary: '#5a5749',
  textTertiary: '#8a8a80',
  textMuted: '#dddad2',

  // Accent — orange (same)
  accent: '#d97757',
  accentLight: 'rgba(217, 119, 87, 0.1)',
  accentSoft: 'rgba(217, 119, 87, 0.12)',

  // Status dots
  statusIdle: '#8a8a80',
  statusRunning: '#d97757',
  statusRunningBg: 'rgba(217, 119, 87, 0.1)',
  statusComplete: '#5a9e6f',
  statusCompleteBg: 'rgba(90, 158, 111, 0.1)',
  statusError: '#c47060',
  statusErrorBg: 'rgba(196, 112, 96, 0.06)',
  statusDead: '#c47060',
  statusPermission: '#d97757',
  statusPermissionGlow: 'rgba(217, 119, 87, 0.3)',

  // Tab
  tabActive: '#edeae0',
  tabActiveBorder: '#dddad2',
  tabInactive: 'transparent',
  tabHover: 'rgba(0, 0, 0, 0.04)',

  // User message bubble
  userBubble: '#edeae0',
  userBubbleBorder: '#dddad2',
  userBubbleText: '#3c3929',

  // Tool card
  toolBg: '#edeae0',
  toolBorder: '#dddad2',
  toolRunningBorder: 'rgba(217, 119, 87, 0.3)',
  toolRunningBg: 'rgba(217, 119, 87, 0.05)',

  // Timeline
  timelineLine: '#dddad2',
  timelineNode: 'rgba(217, 119, 87, 0.2)',
  timelineNodeActive: '#d97757',

  // Scrollbar
  scrollThumb: 'rgba(0, 0, 0, 0.1)',
  scrollThumbHover: 'rgba(0, 0, 0, 0.18)',

  // Stop button
  stopBg: '#ef4444',
  stopHover: '#dc2626',

  // Send button
  sendBg: '#d97757',
  sendHover: '#c96442',
  sendDisabled: 'rgba(217, 119, 87, 0.3)',

  // Popover
  popoverBg: '#f9f8f5',
  popoverBorder: '#dddad2',
  popoverShadow: '0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)',

  // Code block
  codeBg: '#f0eee8',

  // Mic button
  micBg: '#edeae0',
  micColor: '#5a5749',
  micDisabled: '#c8c5bc',

  // Placeholder
  placeholder: '#b0ada4',

  // Disabled button color
  btnDisabled: '#c8c5bc',

  // Text on accent backgrounds
  textOnAccent: '#ffffff',

  // Button hover (CSS-only stack buttons)
  btnHoverColor: '#3c3929',
  btnHoverBg: '#edeae0',

  // Accent border variants (replaces hex-alpha concatenation antipattern)
  accentBorder: 'rgba(217, 119, 87, 0.19)',
  accentBorderMedium: 'rgba(217, 119, 87, 0.25)',

  // Permission card (amber)
  permissionBorder: 'rgba(245, 158, 11, 0.3)',
  permissionShadow: '0 2px 12px rgba(245, 158, 11, 0.08)',
  permissionHeaderBg: 'rgba(245, 158, 11, 0.06)',
  permissionHeaderBorder: 'rgba(245, 158, 11, 0.12)',

  // Permission allow (green)
  permissionAllowBg: 'rgba(34, 197, 94, 0.1)',
  permissionAllowHoverBg: 'rgba(34, 197, 94, 0.22)',
  permissionAllowBorder: 'rgba(34, 197, 94, 0.25)',

  // Permission deny (red)
  permissionDenyBg: 'rgba(239, 68, 68, 0.08)',
  permissionDenyHoverBg: 'rgba(239, 68, 68, 0.18)',
  permissionDenyBorder: 'rgba(239, 68, 68, 0.22)',

  // Permission denied card
  permissionDeniedBorder: 'rgba(196, 112, 96, 0.3)',
  permissionDeniedHeaderBorder: 'rgba(196, 112, 96, 0.12)',

  // Diff (Edit tool inline diff)
  diffRemovedBg: 'rgba(248, 81, 73, 0.15)',
  diffAddedBg: 'rgba(63, 185, 80, 0.15)',
} as const

export type ColorPalette = { [K in keyof typeof darkColors]: string }

// ─── Additional theme palettes ───
// Each theme overrides a subset of tokens on top of the dark or light base.

function makePalette(base: ColorPalette, overrides: Partial<ColorPalette>): ColorPalette {
  return { ...base, ...overrides }
}

// Pantone Color of the Year 2025 — warm, grounded brown
const mochaMousseColors = makePalette(lightColors, {
  containerBg: '#f5ede3',
  containerBgCollapsed: '#efe5d5',
  containerBorder: '#d9c6ad',
  surfacePrimary: '#ebe0cd',
  surfaceSecondary: '#d9c6ad',
  surfaceHover: 'rgba(58, 46, 35, 0.05)',
  surfaceActive: 'rgba(58, 46, 35, 0.08)',
  inputPillBg: '#fff8ed',
  inputBorder: '#d9c6ad',
  inputFocusBorder: 'rgba(164, 120, 100, 0.45)',
  textPrimary: '#3a2e23',
  textSecondary: '#594434',
  textTertiary: '#8a7561',
  textMuted: '#d9c6ad',
  accent: '#a47864',
  accentLight: 'rgba(164, 120, 100, 0.1)',
  accentSoft: 'rgba(164, 120, 100, 0.16)',
  accentBorder: 'rgba(164, 120, 100, 0.2)',
  accentBorderMedium: 'rgba(164, 120, 100, 0.3)',
  statusRunning: '#a47864',
  statusRunningBg: 'rgba(164, 120, 100, 0.1)',
  statusPermission: '#a47864',
  statusPermissionGlow: 'rgba(164, 120, 100, 0.35)',
  tabActive: '#ebe0cd',
  tabActiveBorder: '#d9c6ad',
  tabHover: 'rgba(58, 46, 35, 0.05)',
  userBubble: '#ebe0cd',
  userBubbleBorder: '#d9c6ad',
  userBubbleText: '#3a2e23',
  toolBg: '#ebe0cd',
  toolBorder: '#d9c6ad',
  toolRunningBorder: 'rgba(164, 120, 100, 0.3)',
  toolRunningBg: 'rgba(164, 120, 100, 0.05)',
  timelineLine: '#d9c6ad',
  timelineNode: 'rgba(164, 120, 100, 0.2)',
  timelineNodeActive: '#a47864',
  sendBg: '#a47864',
  sendHover: '#8a624f',
  sendDisabled: 'rgba(164, 120, 100, 0.3)',
  popoverBg: '#f5ede3',
  popoverBorder: '#d9c6ad',
  codeBg: '#f0e5d2',
  micBg: '#ebe0cd',
  micColor: '#594434',
  micDisabled: '#c8b89e',
  btnDisabled: '#c8b89e',
  btnHoverColor: '#3a2e23',
  btnHoverBg: '#ebe0cd',
  placeholder: '#b0997e',
})

// Pantone Color of the Year 2022 — cool periwinkle blue-violet on twilight
const veryPeriColors = makePalette(darkColors, {
  containerBg: '#181826',
  containerBgCollapsed: '#14141f',
  containerBorder: '#2e2e44',
  surfacePrimary: '#222234',
  surfaceSecondary: '#2e2e44',
  surfaceHover: 'rgba(216, 216, 232, 0.05)',
  surfaceActive: 'rgba(216, 216, 232, 0.08)',
  inputPillBg: '#1e1e2e',
  inputBorder: '#2e2e44',
  inputFocusBorder: 'rgba(102, 103, 171, 0.45)',
  textPrimary: '#d8d8ec',
  textSecondary: '#b8b8d0',
  textTertiary: '#7a7a96',
  textMuted: '#2e2e44',
  accent: '#6667ab',
  accentLight: 'rgba(102, 103, 171, 0.12)',
  accentSoft: 'rgba(102, 103, 171, 0.2)',
  accentBorder: 'rgba(102, 103, 171, 0.22)',
  accentBorderMedium: 'rgba(102, 103, 171, 0.32)',
  statusRunning: '#6667ab',
  statusRunningBg: 'rgba(102, 103, 171, 0.12)',
  statusPermission: '#6667ab',
  statusPermissionGlow: 'rgba(102, 103, 171, 0.4)',
  tabActive: '#222234',
  tabActiveBorder: '#2e2e44',
  tabHover: 'rgba(216, 216, 232, 0.05)',
  userBubble: '#222234',
  userBubbleBorder: '#2e2e44',
  userBubbleText: '#d8d8ec',
  toolBg: '#222234',
  toolBorder: '#2e2e44',
  toolRunningBorder: 'rgba(102, 103, 171, 0.35)',
  toolRunningBg: 'rgba(102, 103, 171, 0.08)',
  timelineLine: '#222234',
  timelineNode: 'rgba(102, 103, 171, 0.22)',
  timelineNodeActive: '#6667ab',
  sendBg: '#6667ab',
  sendHover: '#5556a0',
  sendDisabled: 'rgba(102, 103, 171, 0.3)',
  popoverBg: '#1e1e2e',
  popoverBorder: '#2e2e44',
  codeBg: '#0e0e18',
  micBg: '#222234',
  micColor: '#b8b8d0',
  btnHoverColor: '#d8d8ec',
  btnHoverBg: '#222234',
  placeholder: '#6a6a86',
  cardShadow: '0 2px 8px rgba(0,0,0,0.4)',
  cardShadowCollapsed: '0 2px 6px rgba(0,0,0,0.5)',
})

// Pantone Color of the Year 2023 — dramatic, rich magenta on deep wine
const vivaMagentaColors = makePalette(darkColors, {
  containerBg: '#1f1418',
  containerBgCollapsed: '#1b1015',
  containerBorder: '#3a2026',
  surfacePrimary: '#2c1c22',
  surfaceSecondary: '#3a2026',
  surfaceHover: 'rgba(255, 255, 255, 0.05)',
  surfaceActive: 'rgba(255, 255, 255, 0.08)',
  inputPillBg: '#1a1014',
  inputBorder: '#3a2026',
  inputFocusBorder: 'rgba(190, 52, 85, 0.45)',
  textPrimary: '#f0d8de',
  textSecondary: '#d8b8c0',
  textTertiary: '#8a6470',
  textMuted: '#2c1c22',
  accent: '#be3455',
  accentLight: 'rgba(190, 52, 85, 0.12)',
  accentSoft: 'rgba(190, 52, 85, 0.2)',
  accentBorder: 'rgba(190, 52, 85, 0.22)',
  accentBorderMedium: 'rgba(190, 52, 85, 0.32)',
  statusRunning: '#be3455',
  statusRunningBg: 'rgba(190, 52, 85, 0.12)',
  statusPermission: '#be3455',
  statusPermissionGlow: 'rgba(190, 52, 85, 0.4)',
  tabActive: '#2c1c22',
  tabActiveBorder: '#3a2026',
  tabHover: 'rgba(255, 255, 255, 0.05)',
  userBubble: '#2c1c22',
  userBubbleBorder: '#3a2026',
  userBubbleText: '#f0d8de',
  toolBg: '#2c1c22',
  toolBorder: '#3a2026',
  toolRunningBorder: 'rgba(190, 52, 85, 0.35)',
  toolRunningBg: 'rgba(190, 52, 85, 0.08)',
  timelineLine: '#2c1c22',
  timelineNode: 'rgba(190, 52, 85, 0.22)',
  timelineNodeActive: '#be3455',
  sendBg: '#be3455',
  sendHover: '#a82846',
  sendDisabled: 'rgba(190, 52, 85, 0.3)',
  popoverBg: '#251a1e',
  popoverBorder: '#3a2026',
  codeBg: '#15090c',
  micBg: '#2c1c22',
  micColor: '#d8b8c0',
  btnHoverColor: '#f0d8de',
  btnHoverBg: '#2c1c22',
  placeholder: '#705560',
  cardShadow: '0 2px 8px rgba(0,0,0,0.4)',
  cardShadowCollapsed: '0 2px 6px rgba(0,0,0,0.5)',
})

// Calacatta marble — bright white surfaces, gold veining accent
const calacattaColors = makePalette(lightColors, {
  containerBg: '#fbfaf5',
  containerBgCollapsed: '#f5f3ec',
  containerBorder: '#e0d8c0',
  surfacePrimary: '#f0ebdc',
  surfaceSecondary: '#e0d8c0',
  surfaceHover: 'rgba(42, 37, 32, 0.04)',
  surfaceActive: 'rgba(42, 37, 32, 0.07)',
  inputPillBg: '#fffefa',
  inputBorder: '#e0d8c0',
  inputFocusBorder: 'rgba(184, 154, 92, 0.45)',
  textPrimary: '#2a2520',
  textSecondary: '#4a4338',
  textTertiary: '#8a8170',
  textMuted: '#e0d8c0',
  accent: '#b89a5c',
  accentLight: 'rgba(184, 154, 92, 0.1)',
  accentSoft: 'rgba(184, 154, 92, 0.16)',
  accentBorder: 'rgba(184, 154, 92, 0.22)',
  accentBorderMedium: 'rgba(184, 154, 92, 0.32)',
  statusRunning: '#b89a5c',
  statusRunningBg: 'rgba(184, 154, 92, 0.1)',
  statusPermission: '#b89a5c',
  statusPermissionGlow: 'rgba(184, 154, 92, 0.4)',
  tabActive: '#f0ebdc',
  tabActiveBorder: '#e0d8c0',
  tabHover: 'rgba(42, 37, 32, 0.04)',
  userBubble: '#f0ebdc',
  userBubbleBorder: '#e0d8c0',
  userBubbleText: '#2a2520',
  toolBg: '#f0ebdc',
  toolBorder: '#e0d8c0',
  toolRunningBorder: 'rgba(184, 154, 92, 0.3)',
  toolRunningBg: 'rgba(184, 154, 92, 0.05)',
  timelineLine: '#e0d8c0',
  timelineNode: 'rgba(184, 154, 92, 0.2)',
  timelineNodeActive: '#b89a5c',
  sendBg: '#b89a5c',
  sendHover: '#a08648',
  sendDisabled: 'rgba(184, 154, 92, 0.3)',
  popoverBg: '#fbfaf5',
  popoverBorder: '#e0d8c0',
  codeBg: '#f0ebdc',
  micBg: '#f0ebdc',
  micColor: '#4a4338',
  micDisabled: '#cec5ab',
  btnDisabled: '#cec5ab',
  btnHoverColor: '#2a2520',
  btnHoverBg: '#f0ebdc',
  placeholder: '#a89e85',
})

// Nero Marquina marble — black field with warm cream veining
const marquinaColors = makePalette(darkColors, {
  containerBg: '#131312',
  containerBgCollapsed: '#0f0f0e',
  containerBorder: '#2a2926',
  surfacePrimary: '#1e1d1b',
  surfaceSecondary: '#2a2926',
  surfaceHover: 'rgba(232, 226, 210, 0.05)',
  surfaceActive: 'rgba(232, 226, 210, 0.08)',
  inputPillBg: '#1a1a18',
  inputBorder: '#2a2926',
  inputFocusBorder: 'rgba(212, 200, 168, 0.45)',
  textPrimary: '#e8e2d2',
  textSecondary: '#c8c2b2',
  textTertiary: '#807a6a',
  textMuted: '#2a2926',
  accent: '#d4c8a8',
  accentLight: 'rgba(212, 200, 168, 0.1)',
  accentSoft: 'rgba(212, 200, 168, 0.18)',
  accentBorder: 'rgba(212, 200, 168, 0.22)',
  accentBorderMedium: 'rgba(212, 200, 168, 0.32)',
  statusRunning: '#d4c8a8',
  statusRunningBg: 'rgba(212, 200, 168, 0.1)',
  statusPermission: '#d4c8a8',
  statusPermissionGlow: 'rgba(212, 200, 168, 0.4)',
  tabActive: '#1e1d1b',
  tabActiveBorder: '#2a2926',
  tabHover: 'rgba(232, 226, 210, 0.05)',
  userBubble: '#1e1d1b',
  userBubbleBorder: '#2a2926',
  userBubbleText: '#e8e2d2',
  toolBg: '#1e1d1b',
  toolBorder: '#2a2926',
  toolRunningBorder: 'rgba(212, 200, 168, 0.3)',
  toolRunningBg: 'rgba(212, 200, 168, 0.05)',
  timelineLine: '#2a2926',
  timelineNode: 'rgba(212, 200, 168, 0.2)',
  timelineNodeActive: '#d4c8a8',
  sendBg: '#d4c8a8',
  sendHover: '#b8ad8e',
  sendDisabled: 'rgba(212, 200, 168, 0.3)',
  textOnAccent: '#1a1a18',
  popoverBg: '#1a1a18',
  popoverBorder: '#2a2926',
  codeBg: '#0a0a08',
  micBg: '#1e1d1b',
  micColor: '#c8c2b2',
  btnHoverColor: '#e8e2d2',
  btnHoverBg: '#1e1d1b',
  placeholder: '#605a4d',
  cardShadow: '0 2px 8px rgba(0,0,0,0.45)',
  cardShadowCollapsed: '0 2px 6px rgba(0,0,0,0.55)',
})

// ─── Theme registry ───

export interface ThemeDefinition {
  name: string
  displayName: string
  base: 'light' | 'dark'
  palette: ColorPalette
  /** Three-color swatch for UI previews */
  swatch: { bg: string; accent: string; text: string }
}

const swatchOf = (p: ColorPalette) => ({ bg: p.containerBg, accent: p.accent, text: p.textPrimary })

export const themes: Record<string, ThemeDefinition> = {
  mocha:     { name: 'mocha',     displayName: 'Mocha Mousse',  base: 'light', palette: mochaMousseColors,   swatch: swatchOf(mochaMousseColors) },
  veryperi:  { name: 'veryperi',  displayName: 'Very Peri',     base: 'dark',  palette: veryPeriColors,      swatch: swatchOf(veryPeriColors) },
  magenta:   { name: 'magenta',   displayName: 'Viva Magenta',  base: 'dark',  palette: vivaMagentaColors,   swatch: swatchOf(vivaMagentaColors) },
  calacatta: { name: 'calacatta', displayName: 'Calacatta',     base: 'light', palette: calacattaColors,     swatch: swatchOf(calacattaColors) },
  marquina:  { name: 'marquina',  displayName: 'Nero Marquina', base: 'dark',  palette: marquinaColors,      swatch: swatchOf(marquinaColors) },
}

/** Order in which themes appear in the picker */
export const themeOrder: string[] = ['mocha', 'calacatta', 'veryperi', 'magenta', 'marquina']

/** Migrate legacy theme names that are no longer pickable. */
function migrateLegacyTheme(mode: string): string {
  if (mode === 'dark') return 'marquina'
  if (mode === 'light') return 'calacatta'
  return mode
}

// ─── Theme store ───

export type ThemeMode = 'system' | keyof typeof themes | string

interface ThemeState {
  isDark: boolean
  themeMode: ThemeMode
  soundEnabled: boolean
  expandedUI: boolean
  /** OS-reported dark mode — used when themeMode is 'system' */
  _systemIsDark: boolean
  setIsDark: (isDark: boolean) => void
  setThemeMode: (mode: ThemeMode) => void
  setSoundEnabled: (enabled: boolean) => void
  setExpandedUI: (expanded: boolean) => void
  /** Called by OS theme change listener — updates system value */
  setSystemTheme: (isDark: boolean) => void
}

/** Convert camelCase token name to --clui-kebab-case CSS custom property */
function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

/** Sync all JS design tokens to CSS custom properties on :root */
function syncTokensToCss(tokens: ColorPalette): void {
  const style = document.documentElement.style
  for (const [key, value] of Object.entries(tokens)) {
    style.setProperty(`--clui-${camelToKebab(key)}`, value)
  }
}

/** Resolve a themeMode + OS state to the active ThemeDefinition. */
function resolveTheme(mode: ThemeMode, systemIsDark: boolean): ThemeDefinition {
  if (mode === 'system') return systemIsDark ? themes.marquina : themes.calacatta
  return themes[migrateLegacyTheme(mode as string)] || themes.marquina
}

function applyTheme(theme: ThemeDefinition): void {
  document.documentElement.classList.toggle('dark', theme.base === 'dark')
  document.documentElement.classList.toggle('light', theme.base === 'light')
  document.documentElement.setAttribute('data-theme', theme.name)
  syncTokensToCss(theme.palette)
}

const SETTINGS_KEY = 'clui-settings'

function loadSettings(): { themeMode: ThemeMode; soundEnabled: boolean; expandedUI: boolean } {
  const DEFAULT_THEME: ThemeMode = 'marquina'
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      let mode: string = typeof parsed.themeMode === 'string' ? parsed.themeMode : DEFAULT_THEME
      mode = migrateLegacyTheme(mode)
      const validMode: ThemeMode = mode === 'system' || mode in themes ? mode : DEFAULT_THEME
      return {
        themeMode: validMode,
        soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
        expandedUI: typeof parsed.expandedUI === 'boolean' ? parsed.expandedUI : false,
      }
    }
  } catch {}
  return { themeMode: DEFAULT_THEME, soundEnabled: true, expandedUI: false }
}

function saveSettings(s: { themeMode: ThemeMode; soundEnabled: boolean; expandedUI: boolean }): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)) } catch {}
}

// Always start in compact UI mode on launch.
const saved = { ...loadSettings(), expandedUI: false }
const initialTheme = resolveTheme(saved.themeMode, true)

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: initialTheme.base === 'dark',
  themeMode: saved.themeMode,
  soundEnabled: saved.soundEnabled,
  expandedUI: saved.expandedUI,
  _systemIsDark: true,
  setIsDark: (isDark) => {
    // Legacy entrypoint — pick the closest classic theme.
    const mode: ThemeMode = isDark ? 'dark' : 'light'
    const theme = resolveTheme(mode, get()._systemIsDark)
    set({ isDark: theme.base === 'dark', themeMode: mode })
    applyTheme(theme)
  },
  setThemeMode: (mode) => {
    const theme = resolveTheme(mode, get()._systemIsDark)
    set({ themeMode: mode, isDark: theme.base === 'dark' })
    applyTheme(theme)
    saveSettings({ themeMode: mode, soundEnabled: get().soundEnabled, expandedUI: get().expandedUI })
  },
  setSoundEnabled: (enabled) => {
    set({ soundEnabled: enabled })
    saveSettings({ themeMode: get().themeMode, soundEnabled: enabled, expandedUI: get().expandedUI })
  },
  setExpandedUI: (expanded) => {
    set({ expandedUI: expanded })
    saveSettings({ themeMode: get().themeMode, soundEnabled: get().soundEnabled, expandedUI: expanded })
  },
  setSystemTheme: (isDark) => {
    set({ _systemIsDark: isDark })
    // Only apply if following system
    if (get().themeMode === 'system') {
      const theme = resolveTheme('system', isDark)
      set({ isDark: theme.base === 'dark' })
      applyTheme(theme)
    }
  },
}))

// Initialize CSS vars with saved theme
syncTokensToCss(initialTheme.palette)

/** Reactive hook — returns the active color palette */
export function useColors(): ColorPalette {
  const themeMode = useThemeStore((s) => s.themeMode)
  const systemIsDark = useThemeStore((s) => s._systemIsDark)
  return resolveTheme(themeMode, systemIsDark).palette
}

/** Non-reactive getter — use outside React components */
export function getColors(isDark: boolean): ColorPalette {
  return isDark ? darkColors : lightColors
}

// ─── Backward compatibility ───
// Legacy static export — components being migrated should use useColors() instead
export const colors = darkColors

// ─── Spacing ───

export const spacing = {
  contentWidth: 460,
  containerRadius: 20,
  containerPadding: 12,
  tabHeight: 32,
  inputMinHeight: 44,
  inputMaxHeight: 160,
  conversationMaxHeight: 380,
  pillRadius: 9999,
  circleSize: 36,
  circleGap: 8,
} as const

// ─── Animation ───

export const motion = {
  spring: { type: 'spring' as const, stiffness: 500, damping: 30 },
  easeOut: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  fadeIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.15 },
  },
} as const

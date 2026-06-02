// Flexoki palette — canonical source: _generators/src/palette.ts
// All hex values must match that file exactly.
const p = {
  paper:   '#FFFCF0',
  black:   '#100F0F',
  base50:  '#F2F0E5',
  base100: '#E6E4D9',
  base150: '#DAD8CE',
  base200: '#CECDC3',
  base300: '#B7B5AC',
  base400: '#9F9D96',
  base500: '#878580',
  base600: '#6F6E69',
  base700: '#575653',
  base800: '#403E3C',
  base850: '#343331',
  base900: '#282726',
  base950: '#1C1B1A',

  // Accent: 400 = light-mode foreground / dark-mode button bg
  //         600 = dark-mode foreground / light-mode button bg
  re400: '#D14D41', re600: '#AF3029',
  or400: '#DA702C', or600: '#BC5215',
  ye400: '#D0A215', ye600: '#AD8301',
  gr400: '#879A39', gr600: '#66800B',
  cy400: '#3AA99F', cy600: '#24837B',
  bl400: '#4385BE', bl600: '#205EA6',
  pu400: '#8B7EC8', pu600: '#5E409D',
  ma400: '#CE5D97', ma600: '#A02F6F',

  // Extended palette (for GNOME palette mapping)
  re300: '#E8705F', re500: '#C03E35', re700: '#942822',
  or100: '#FED3AF', or200: '#F9AE77', or300: '#EC8B49',
  or500: '#CB6120', or700: '#9D4310', or900: '#40200D',
  ye200: '#ECCB60', ye300: '#DFB431', ye700: '#8E6B01',
  gr200: '#BEC97E', gr300: '#A0AF54', gr700: '#536907',
  bl200: '#92BFDB', bl300: '#66A0C8', bl700: '#1A4F8C',
  pu200: '#C4B9E0', pu300: '#A699D0', pu700: '#4F3685',
} as const

type Val = string

// [varName, lightValue, darkValue]
type Row = [string, Val, Val]

// ── Layer 1: shared semantic variables (GTK3 + GTK4) ─────────────────────────

export const sharedColors: Row[] = [
  ['accent_color',              p.bl600,               p.bl400],
  ['accent_bg_color',           p.bl400,               p.bl600],
  ['accent_fg_color',           p.paper,               p.base200],
  ['destructive_color',         p.re600,               p.re400],
  ['destructive_bg_color',      p.re400,               p.re600],
  ['destructive_fg_color',      p.paper,               p.base200],
  ['success_color',             p.gr600,               p.gr400],
  ['success_bg_color',          p.gr400,               p.gr600],
  ['success_fg_color',          p.paper,               p.base200],
  ['warning_color',             p.ye600,               p.ye400],
  ['warning_bg_color',          p.ye400,               p.ye600],
  ['warning_fg_color',          'rgba(0, 0, 0, 0.8)',  'rgba(0, 0, 0, 0.8)'],
  ['error_color',               p.re600,               p.re400],
  ['error_bg_color',            p.re400,               p.re600],
  ['error_fg_color',            p.paper,               p.base200],
  ['window_bg_color',           p.paper,               p.black],
  ['window_fg_color',           p.black,               p.base200],
  ['view_bg_color',             p.paper,               p.base950],
  ['view_fg_color',             p.black,               p.base200],
  ['headerbar_bg_color',        p.paper,               p.black],
  ['headerbar_fg_color',        p.black,               p.base200],
  ['headerbar_border_color',    p.base100,             p.base900],
  ['headerbar_backdrop_color',  p.base50,              p.base950],
  ['headerbar_shade_color',     'rgba(0, 0, 0, 0.12)', 'rgba(0, 0, 0, 0.36)'],
  ['headerbar_darker_shade_color', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)'],
  ['sidebar_bg_color',          p.paper,               p.black],
  ['sidebar_fg_color',          p.black,               p.base200],
  ['sidebar_backdrop_color',    p.base50,              p.base950],
  ['sidebar_shade_color',       'rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.25)'],
  // sidebar_border uses the base-100/base-900 hex as an rgba alpha value
  ['sidebar_border_color',      'rgba(230, 228, 217, 0.36)', 'rgba(40, 39, 38, 0.36)'],
  ['card_bg_color',             p.paper,               p.black],
  ['card_fg_color',             p.black,               p.base200],
  ['card_shade_color',          'rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.36)'],
  ['dialog_bg_color',           p.paper,               p.black],
  ['dialog_fg_color',           p.black,               p.base200],
  ['popover_bg_color',          p.paper,               p.black],
  ['popover_fg_color',          p.black,               p.base200],
  ['popover_shade_color',       'rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.25)'],
  ['thumbnail_bg_color',        p.base100,             p.black],
  ['thumbnail_fg_color',        p.paper,               p.paper],
  ['shade_color',               p.base50,              p.base950],
  ['scrollbar_outline_color',   'rgba(0, 0, 0, 0.5)',  'rgba(0, 0, 0, 0.5)'],
]

// ── Layer 2: GTK4-only (libadwaita secondary sidebar) ────────────────────────

export const gtk4OnlyColors: Row[] = [
  ['secondary_sidebar_bg_color',         p.base50,              p.base950],
  ['secondary_sidebar_fg_color',         p.black,               p.base200],
  ['secondary_sidebar_backdrop_color',   p.base100,             p.base900],
  ['secondary_sidebar_shade_color',      'rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.25)'],
  ['secondary_sidebar_border_color',     'rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0.36)'],
]

// ── Layer 3: GTK3-only (app-specific, in the color header) ───────────────────

export const gtk3OnlyColors: Row[] = [
  ['incognito_bg_color',  p.base50,  p.base950],
  ['new_title_bg_color',  p.base50,  p.base950],
  ['panel_bg_color',      p.black,   p.black],
  ['panel_fg_color',      p.paper,   p.paper],
]

// ── Layer 4: GNOME palette override (GTK3 inline, GTK4 via tweaks) ───────────
// Maps GNOME's 5-step color ramp to Flexoki extended palette.
// brown_* has no Flexoki equivalent → use warm orange darks as substitute.
// light_*/dark_* map to Flexoki warm base tones.

export const gnomePalette: [string, Val][] = [
  ['blue_1',   p.bl200], ['blue_2',   p.bl300], ['blue_3',   p.bl400],
  ['blue_4',   p.bl600], ['blue_5',   p.bl700],

  ['green_1',  p.gr200], ['green_2',  p.gr300], ['green_3',  p.gr400],
  ['green_4',  p.gr600], ['green_5',  p.gr700],

  ['yellow_1', p.ye200], ['yellow_2', p.ye300], ['yellow_3', p.ye400],
  ['yellow_4', p.ye600], ['yellow_5', p.ye700],

  ['orange_1', p.or200], ['orange_2', p.or300], ['orange_3', p.or400],
  ['orange_4', p.or600], ['orange_5', p.or700],

  ['red_1',    p.re300], ['red_2',    p.re400], ['red_3',    p.re500],
  ['red_4',    p.re600], ['red_5',    p.re700],

  ['purple_1', p.pu200], ['purple_2', p.pu300], ['purple_3', p.pu400],
  ['purple_4', p.pu600], ['purple_5', p.pu700],

  // brown → warm orange substitute
  ['brown_1',  p.or100], ['brown_2',  p.or300], ['brown_3',  p.or500],
  ['brown_4',  p.or700], ['brown_5',  p.or900],

  // light/dark → Flexoki warm base scale
  ['light_1',  p.paper],   ['light_2', p.base50],  ['light_3', p.base150],
  ['light_4',  p.base200], ['light_5', p.base400],
  ['dark_1',   p.base500], ['dark_2',  p.base600],  ['dark_3', p.base800],
  ['dark_4',   p.base900], ['dark_5',  p.black],
]

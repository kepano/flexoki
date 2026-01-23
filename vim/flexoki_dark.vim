" flexoki_dark.vim

set background=dark
hi clear

if exists("syntax_on")
	syntax reset
endif

if has('termguicolors')
  set termguicolors
endif

let g:color_name = 'flexoki_dark'

" Flexoki dark

let s:base = {}
let s:base.flexoki_black       = '#100F0F'
let s:base.flexoki_paper 		   = '#FFFCF0'
let s:base.flexoki_950         = '#1C1B1A'
let s:base.flexoki_900         = '#282726'
let s:base.flexoki_850         = '#343331'
let s:base.flexoki_800         = '#403E3C'
let s:base.flexoki_700         = '#575653'
let s:base.flexoki_600         = '#6F6E69'
let s:base.flexoki_500         = '#878580'
let s:base.flexoki_300         = '#B7B5AC'
let s:base.flexoki_200         = '#CECDC3'
let s:base.flexoki_150         = '#DAD8CE'
let s:base.flexoki_100         = '#E6E4D9'
let s:base.flexoki_50          = '#F2F0E5'

let s:base.flexoki_red_600     = '#AF3029'
let s:base.flexoki_red_400     = '#D14D41'

let s:base.flexoki_orange_600  = '#BC5215'
let s:base.flexoki_orange_400  = '#DA702C'

let s:base.flexoki_yellow_900  = '#4D3A0B'
let s:base.flexoki_yellow_600  = '#AD8301'
let s:base.flexoki_yellow_400  = '#D0A215'
let s:base.flexoki_yellow_100  = '#FCEEB8'

let s:base.flexoki_green_600   = '#66800B'
let s:base.flexoki_green_400   = '#879A39'

let s:base.flexoki_cyan_950    = '#142625'
let s:base.flexoki_cyan_600    = '#24837B'
let s:base.flexoki_cyan_400    = '#3AA99F'
let s:base.flexoki_cyan_50     = '#EBF2E7'

let s:base.flexoki_blue_600    = '#205EA6'
let s:base.flexoki_blue_400    = '#4385BE'

let s:base.flexoki_purple_600  = '#5E409D'
let s:base.flexoki_purple_400  = '#8B7EC8'

let s:base.flexoki_magenta_600 = '#A02F6F'
let s:base.flexoki_magenta_400 = '#CE5D97'

let s:variants = {}
let s:variants.dark = {}
let s:variants.dark.bg     = s:base.flexoki_black
let s:variants.dark.bg_2   = s:base.flexoki_950
let s:variants.dark.ui     = s:base.flexoki_900
let s:variants.dark.ui_2   = s:base.flexoki_850
let s:variants.dark.ui_3   = s:base.flexoki_800
let s:variants.dark.tx_3   = s:base.flexoki_700
let s:variants.dark.tx_2   = s:base.flexoki_500
let s:variants.dark.tx     = s:base.flexoki_200
let s:variants.dark.re     = s:base.flexoki_red_400
let s:variants.dark.re_2   = s:base.flexoki_red_600
let s:variants.dark.or     = s:base.flexoki_orange_400
let s:variants.dark.or_2   = s:base.flexoki_orange_600
let s:variants.dark.ye     = s:base.flexoki_yellow_400
let s:variants.dark.ye_2   = s:base.flexoki_yellow_600
let s:variants.dark.gr     = s:base.flexoki_green_400
let s:variants.dark.gr_2   = s:base.flexoki_green_600
let s:variants.dark.cy     = s:base.flexoki_cyan_400
let s:variants.dark.cy_2   = s:base.flexoki_cyan_600
let s:variants.dark.bl     = s:base.flexoki_blue_400
let s:variants.dark.bl_2   = s:base.flexoki_blue_600
let s:variants.dark.pu     = s:base.flexoki_purple_400
let s:variants.dark.pu_2   = s:base.flexoki_purple_600
let s:variants.dark.ma     = s:base.flexoki_magenta_400
let s:variants.dark.ma_2   = s:base.flexoki_magenta_600

function! s:Hi(group, opts) abort
  let l:cmd = 'hi ' . a:group

  if has_key(a:opts, 'fg')
    let l:cmd .= ' guifg=' . a:opts.fg
  endif
  if has_key(a:opts, 'bg')
    let l:cmd .= ' guibg=' . a:opts.bg
  endif
  if has_key(a:opts, 'sp')
    let l:cmd .= ' guisp=' . a:opts.sp
  endif
  if has_key(a:opts, 'style')
    let l:cmd .= ' gui=' . a:opts.style
  endif

  execute l:cmd
endfunction

call s:Hi('Normal',       {'fg': s:variants.dark.tx,   'bg': s:variants.dark.bg})
call s:Hi('NormalNC',     {'fg': 'NONE',              'bg': 'NONE'})
call s:Hi('Underlined',   {'fg': 'NONE',              'bg': 'NONE', 'style': 'underline'})
call s:Hi('Bold',         {'fg': 'NONE',              'bg': 'NONE', 'style': 'bold'})
call s:Hi('Italic',       {'fg': 'NONE',              'bg': 'NONE', 'style': 'italic'})

call s:Hi('SpellBad',     {'fg': s:variants.dark.re_2, 'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellCap',     {'fg': s:variants.dark.ye,   'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellLocal',   {'fg': s:variants.dark.gr,   'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellRare',    {'fg': s:variants.dark.pu,   'bg': 'NONE', 'style': 'underline'})

call s:Hi('Search',       {'fg': s:variants.dark.tx, 'bg': s:variants.dark.ye})
call s:Hi('IncSearch',    {'fg': s:variants.dark.tx, 'bg': s:variants.dark.ye})
call s:Hi('CurSearch',    {'fg': s:variants.dark.tx, 'bg': s:variants.dark.ye_2})
call s:Hi('Substitute',   {'fg': s:variants.dark.tx, 'bg': s:variants.dark.gr})

call s:Hi('DiffAdd',      {'fg': s:variants.dark.bg,   'bg': s:variants.dark.gr})
call s:Hi('DiffChange',   {'fg': s:variants.dark.bg_2, 'bg': s:variants.dark.pu})
call s:Hi('DiffDelete',   {'fg': s:variants.dark.bg_2, 'bg': s:variants.dark.re})
call s:Hi('DiffText',     {'fg': s:variants.dark.bg,   'bg': s:variants.dark.bl_2})

call s:Hi('Comment',      {'fg': s:variants.dark.tx_3, 'bg': 'NONE'})
call s:Hi('Constant',     {'fg': s:variants.dark.ye,   'bg': 'NONE'})
call s:Hi('String',       {'fg': s:variants.dark.cy,   'bg': 'NONE'})
call s:Hi('Character',    {'fg': s:variants.dark.cy,   'bg': 'NONE'})
call s:Hi('Number',       {'fg': s:variants.dark.pu,   'bg': 'NONE'})
call s:Hi('Boolean',      {'fg': s:variants.dark.ma,   'bg': 'NONE'})
call s:Hi('Float',        {'fg': s:variants.dark.pu,   'bg': 'NONE'})

call s:Hi('Identifier',   {'fg': s:variants.dark.bl, 'bg': 'NONE'})
call s:Hi('Function',     {'fg': s:variants.dark.or, 'bg': 'NONE'})
call s:Hi('Keyword',      {'fg': s:variants.dark.gr, 'bg': 'NONE'})
call s:Hi('Operator',     {'fg': s:variants.dark.tx_2, 'bg': 'NONE'})
call s:Hi('PreProc',      {'fg': s:variants.dark.ma, 'bg': 'NONE'})
call s:Hi('Include',      {'fg': s:variants.dark.re, 'bg': 'NONE'})
call s:Hi('Define',       {'fg': s:variants.dark.ma, 'bg': 'NONE'})
call s:Hi('Macro',        {'fg': s:variants.dark.ma, 'bg': 'NONE'})
call s:Hi('Type',         {'fg': s:variants.dark.gr, 'bg': 'NONE'})
call s:Hi('StorageClass', {'fg': s:variants.dark.or, 'bg': 'NONE'})
call s:Hi('Structure',    {'fg': s:variants.dark.or, 'bg': 'NONE'})
call s:Hi('Typedef',      {'fg': s:variants.dark.or, 'bg': 'NONE'})

call s:Hi('Special',      {'fg': s:variants.dark.tx_2, 'bg': 'NONE'})
call s:Hi('SpecialChar',  {'fg': s:variants.dark.ma,   'bg': 'NONE'})
call s:Hi('Tag',          {'fg': s:variants.dark.cy,   'bg': 'NONE'})
call s:Hi('Error',        {'fg': s:variants.dark.re,   'bg': s:variants.dark.bg, 'style': 'bold'})
call s:Hi('Todo',         {'fg': s:variants.dark.ma,   'bg': 'NONE', 'style': 'bold'})

call s:Hi('Cursor',       {'fg': s:variants.dark.bg, 'bg': s:variants.dark.tx})
call s:Hi('CursorLine',   {'bg': s:variants.dark.ui})
call s:Hi('Visual',       {'bg': s:variants.dark.ui_2})
call s:Hi('ColorColumn',  {'bg': s:variants.dark.ui})

call s:Hi('DiagnosticError', {'fg': s:variants.dark.re})
call s:Hi('DiagnosticWarn',  {'fg': s:variants.dark.ye})
call s:Hi('DiagnosticInfo',  {'fg': s:variants.dark.cy})
call s:Hi('DiagnosticHint',  {'fg': s:variants.dark.bl})
call s:Hi('Added',           {'fg': s:variants.dark.gr})
call s:Hi('Removed',         {'fg': s:variants.dark.re})
call s:Hi('Changed',         {'fg': s:variants.dark.or})

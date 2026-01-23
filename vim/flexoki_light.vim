" flexoki_light.vim

set background=light
hi clear

if exists("syntax_on")
	syntax reset
endif

if has('termguicolors')
  set termguicolors
endif

let g:color_name = 'flexoki_light'

" Flexoki light

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
let s:variants.light = {}
let s:variants.light.bg     = s:base.flexoki_paper
let s:variants.light.bg_2   = s:base.flexoki_50
let s:variants.light.ui     = s:base.flexoki_100
let s:variants.light.ui_2   = s:base.flexoki_150
let s:variants.light.ui_3   = s:base.flexoki_200
let s:variants.light.tx_3   = s:base.flexoki_300
let s:variants.light.tx_2   = s:base.flexoki_600
let s:variants.light.tx     = s:base.flexoki_black
let s:variants.light.re     = s:base.flexoki_red_600
let s:variants.light.re_2   = s:base.flexoki_red_400
let s:variants.light.or     = s:base.flexoki_orange_600
let s:variants.light.or_2   = s:base.flexoki_orange_400
let s:variants.light.ye     = s:base.flexoki_yellow_600
let s:variants.light.ye_2   = s:base.flexoki_yellow_400
let s:variants.light.gr     = s:base.flexoki_green_600
let s:variants.light.gr_2   = s:base.flexoki_green_400
let s:variants.light.cy     = s:base.flexoki_cyan_600
let s:variants.light.cy_2   = s:base.flexoki_cyan_400
let s:variants.light.bl     = s:base.flexoki_blue_600
let s:variants.light.bl_2   = s:base.flexoki_blue_400
let s:variants.light.pu     = s:base.flexoki_purple_600
let s:variants.light.pu_2   = s:base.flexoki_purple_400
let s:variants.light.ma     = s:base.flexoki_magenta_600
let s:variants.light.ma_2   = s:base.flexoki_magenta_400

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

call s:Hi('Normal',       {'fg': s:variants.light.tx,   'bg': s:variants.light.bg})
call s:Hi('NormalNC',     {'fg': 'NONE',              'bg': 'NONE'})
call s:Hi('Underlined',   {'fg': 'NONE',              'bg': 'NONE', 'style': 'underline'})
call s:Hi('Bold',         {'fg': 'NONE',              'bg': 'NONE', 'style': 'bold'})
call s:Hi('Italic',       {'fg': 'NONE',              'bg': 'NONE', 'style': 'italic'})

call s:Hi('SpellBad',     {'fg': s:variants.light.re_2, 'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellCap',     {'fg': s:variants.light.ye,   'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellLocal',   {'fg': s:variants.light.gr,   'bg': 'NONE', 'style': 'underline'})
call s:Hi('SpellRare',    {'fg': s:variants.light.pu,   'bg': 'NONE', 'style': 'underline'})

call s:Hi('Search',       {'fg': s:variants.light.tx, 'bg': s:variants.light.ye})
call s:Hi('IncSearch',    {'fg': s:variants.light.tx, 'bg': s:variants.light.ye})
call s:Hi('CurSearch',    {'fg': s:variants.light.tx, 'bg': s:variants.light.ye_2})
call s:Hi('Substitute',   {'fg': s:variants.light.tx, 'bg': s:variants.light.gr})

call s:Hi('DiffAdd',      {'fg': s:variants.light.bg,   'bg': s:variants.light.gr})
call s:Hi('DiffChange',   {'fg': s:variants.light.bg_2, 'bg': s:variants.light.pu})
call s:Hi('DiffDelete',   {'fg': s:variants.light.bg_2, 'bg': s:variants.light.re})
call s:Hi('DiffText',     {'fg': s:variants.light.bg,   'bg': s:variants.light.bl_2})

call s:Hi('Comment',      {'fg': s:variants.light.tx_3, 'bg': 'NONE'})
call s:Hi('Constant',     {'fg': s:variants.light.ye,   'bg': 'NONE'})
call s:Hi('String',       {'fg': s:variants.light.cy,   'bg': 'NONE'})
call s:Hi('Character',    {'fg': s:variants.light.cy,   'bg': 'NONE'})
call s:Hi('Number',       {'fg': s:variants.light.pu,   'bg': 'NONE'})
call s:Hi('Boolean',      {'fg': s:variants.light.ma,   'bg': 'NONE'})
call s:Hi('Float',        {'fg': s:variants.light.pu,   'bg': 'NONE'})kepano

call s:Hi('Identifier',   {'fg': s:variants.light.bl, 'bg': 'NONE'})
call s:Hi('Function',     {'fg': s:variants.light.or, 'bg': 'NONE'})
call s:Hi('Keyword',      {'fg': s:variants.light.gr, 'bg': 'NONE'})
call s:Hi('Operator',     {'fg': s:variants.light.tx_2, 'bg': 'NONE'})
call s:Hi('PreProc',      {'fg': s:variants.light.ma, 'bg': 'NONE'})
call s:Hi('Include',      {'fg': s:variants.light.re, 'bg': 'NONE'})
call s:Hi('Define',       {'fg': s:variants.light.ma, 'bg': 'NONE'})
call s:Hi('Macro',        {'fg': s:variants.light.ma, 'bg': 'NONE'})
call s:Hi('Type',         {'fg': s:variants.light.gr, 'bg': 'NONE'})
call s:Hi('StorageClass', {'fg': s:variants.light.or, 'bg': 'NONE'})
call s:Hi('Structure',    {'fg': s:variants.light.or, 'bg': 'NONE'})
call s:Hi('Typedef',      {'fg': s:variants.light.or, 'bg': 'NONE'})

call s:Hi('Special',      {'fg': s:variants.light.tx_2, 'bg': 'NONE'})
call s:Hi('SpecialChar',  {'fg': s:variants.light.ma,   'bg': 'NONE'})
call s:Hi('Tag',          {'fg': s:variants.light.cy,   'bg': 'NONE'})
call s:Hi('Error',        {'fg': s:variants.light.re,   'bg': s:variants.light.bg, 'style': 'bold'})
call s:Hi('Todo',         {'fg': s:variants.light.ma,   'bg': 'NONE', 'style': 'bold'})

call s:Hi('Cursor',       {'fg': s:variants.light.bg, 'bg': s:variants.light.tx})
call s:Hi('CursorLine',   {'bg': s:variants.light.ui})
call s:Hi('Visual',       {'bg': s:variants.light.ui_2})
call s:Hi('ColorColumn',  {'bg': s:variants.light.ui})

call s:Hi('DiagnosticError', {'fg': s:variants.light.re})
call s:Hi('DiagnosticWarn',  {'fg': s:variants.light.ye})
call s:Hi('DiagnosticInfo',  {'fg': s:variants.light.cy})
call s:Hi('DiagnosticHint',  {'fg': s:variants.light.bl})
call s:Hi('Added',           {'fg': s:variants.light.gr})
call s:Hi('Removed',         {'fg': s:variants.light.re})
call s:Hi('Changed',         {'fg': s:variants.light.or})

local M = {}

M.setup = function(opts)
	local theme = opts.variant == 'light' and require('flexoki.theme-light') or require('flexoki.theme')
	
  vim.cmd('hi clear')

  vim.o.background = 'dark'
  if vim.fn.exists('syntax_on') then
    vim.cmd('syntax reset')
  end

  vim.o.termguicolors = true
  vim.g.colors_name = 'flexoki'

  theme.set_highlights()
end

return M

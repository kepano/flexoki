-- Flexoki light theme by Steph Ango (kepano), https://stephango.com/flexoki
-- Ported by chambored, https://github.com/chambored

local style = require "core.style"
local common = require "core.common"

style.background = { common.color "#FFFCF0" }
style.background2 = { common.color "#F2F0E5" }
style.background3 = { common.color "#E6E4D9" }
style.text = { common.color "#1C1B1A" }
style.caret = { common.color "#1C1B1A" }
style.accent = { common.color "#4385BE" }  -- blue
style.dim = { common.color "#1C1B1A" }
style.divider = { common.color "#CECDC3" }  -- ui-3
style.selection = { common.color "#DAD8CE" }  -- ui-2
style.line_number = { common.color "#6F6E69" }  -- tx-2
style.line_number2 = { common.color "#FFFCF0" }  -- paper
style.line_highlight = { common.color "#B7B5AC" }  -- tx-3
style.scrollbar = { common.color "#E6E4D9" }  -- ui
style.scrollbar2 = { common.color "#B7B5AC" }  -- tx-3

style.syntax["normal"] = { common.color "#E6E4D9" }  -- ui
style.syntax["symbol"] = { common.color "#8B7EC8" }  -- purple
style.syntax["comment"] = { common.color "#6F6E69" }  -- tx-2
style.syntax["keyword"] = { common.color "#D14D41" }  -- red
style.syntax["keyword2"] = { common.color "#4385BE" }  -- blue
style.syntax["number"] = { common.color "#879A39" }  -- green
style.syntax["literal"] = { common.color "#D0A215" }  -- yellow
style.syntax["string"] = { common.color "#DA702C" }  -- orange
style.syntax["operator"] = { common.color "#879A39" }  -- green
style.syntax["function"] = { common.color "#3AA99F" }  -- cyan


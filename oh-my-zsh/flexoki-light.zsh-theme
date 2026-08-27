# name: Flexoki Light
# url: https://stephango.com/flexoki
# preferred_background: fffcf0 # bg

# Flexoki light theme for Oh My Zsh.
# Uses the dark (600) accent values, which the palette recommends for use
# against light backgrounds. See https://stephango.com/flexoki for details.

# Base
FLEXOKI_BG="#fffcf0"
FLEXOKI_BG_2="#f2f0e5"
FLEXOKI_UI="#e6e4d9"
FLEXOKI_UI_2="#dad8ce"
FLEXOKI_UI_3="#cecdc3"
FLEXOKI_TX="#100f0f"
FLEXOKI_TX_2="#575653"
FLEXOKI_TX_3="#878580"

# Accents
FLEXOKI_RED="#af3029"
FLEXOKI_ORANGE="#bc5215"
FLEXOKI_YELLOW="#ad8301"
FLEXOKI_GREEN="#66800b"
FLEXOKI_CYAN="#24837b"
FLEXOKI_BLUE="#205ea6"
FLEXOKI_PURPLE="#5e409d"
FLEXOKI_MAGENTA="#a02f6f"

# Git status
ZSH_THEME_GIT_PROMPT_PREFIX="%F{${FLEXOKI_CYAN}}git:(%F{${FLEXOKI_BLUE}}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%F{${FLEXOKI_CYAN}})%f"
ZSH_THEME_GIT_PROMPT_DIRTY="%F{${FLEXOKI_RED}}✗%f"
ZSH_THEME_GIT_PROMPT_CLEAN="%F{${FLEXOKI_GREEN}}✓%f"

# Prompt
PROMPT='%F{${FLEXOKI_TX}}%~%f $(git_prompt_info)%f
%(?.%F{${FLEXOKI_ORANGE}}❯%f.%F{${FLEXOKI_RED}}%? ❯%f) '
RPROMPT='%F{${FLEXOKI_TX_3}}%n@%m %D{%H:%M}%f'

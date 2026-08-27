# name: Flexoki Dark
# url: https://stephango.com/flexoki
# preferred_background: 100f0f # bg

# Flexoki dark theme for Oh My Zsh.
# Uses the light (400) accent values, which the palette recommends for use
# against dark backgrounds. See https://stephango.com/flexoki for details.

# Base
FLEXOKI_BG="#100f0f"
FLEXOKI_BG_2="#1c1b1a"
FLEXOKI_UI="#282726"
FLEXOKI_UI_2="#343331"
FLEXOKI_UI_3="#403e3c"
FLEXOKI_TX="#cecdc3"
FLEXOKI_TX_2="#878580"
FLEXOKI_TX_3="#575653"

# Accents
FLEXOKI_RED="#d14d41"
FLEXOKI_ORANGE="#da702c"
FLEXOKI_YELLOW="#d0a215"
FLEXOKI_GREEN="#879a39"
FLEXOKI_CYAN="#3aa99f"
FLEXOKI_BLUE="#4385be"
FLEXOKI_PURPLE="#8b7ec8"
FLEXOKI_MAGENTA="#ce5d97"

# Git status
ZSH_THEME_GIT_PROMPT_PREFIX="%F{${FLEXOKI_CYAN}}git:(%F{${FLEXOKI_BLUE}}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%F{${FLEXOKI_CYAN}})%f"
ZSH_THEME_GIT_PROMPT_DIRTY="%F{${FLEXOKI_RED}}✗%f"
ZSH_THEME_GIT_PROMPT_CLEAN="%F{${FLEXOKI_GREEN}}✓%f"

# Prompt
PROMPT='%F{${FLEXOKI_TX}}%~%f $(git_prompt_info)%f
%(?.%F{${FLEXOKI_ORANGE}}❯%f.%F{${FLEXOKI_RED}}%? ❯%f) '
RPROMPT='%F{${FLEXOKI_TX_3}}%n@%m %D{%H:%M}%f'

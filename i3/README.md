# Usage

1. Copy selected mode or flexoki-full for raw range to `~/.config/i3/` (or `~/.config/sway/` if you're using Sway)
2. Include the file at the top of your config file:
```
include flexoki-<mode>
```
3. Use imported colours:
```
# use colours with $colour-name

# target            title   bg  text    indicator   border
client.focused      $tx-2   $bg $tx     $cy         $ui
```
or if you're using flexoki-full
```
# target            title       bg      text        indicator   border
client.focused      $base-500   $black  $base-200   $cyan-400   $base-900
```

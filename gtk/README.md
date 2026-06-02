# Flexoki GTK Theme

GTK3 and GTK4 / libadwaita color theme based on [Flexoki](https://stephango.com/flexoki).
GTK3 widget styles are derived from [adw-gtk3](https://github.com/lassekongo83/adw-gtk3).

## Installation

Use the provided script, which handles both GTK3 and GTK4:

```bash
bash install.sh
```

To uninstall:

```bash
bash uninstall.sh
```

### Manual installation

**GTK3** — copy the theme and apply via gsettings:

```bash
mkdir -p ~/.local/share/themes/flexoki
cp -r theme/* ~/.local/share/themes/flexoki/
gsettings set org.gnome.desktop.interface gtk-theme 'flexoki'
# Or: GNOME Tweaks → Appearance → Applications → select Flexoki
```

**GTK4 / libadwaita** — since GNOME 42, libadwaita deliberately ignores the
`gtk-theme` gsettings key. GTK4 apps load `~/.config/gtk-4.0/gtk.css` directly,
bypassing the theme system entirely. There is a second catch: GTK4 does **not**
load `gtk-dark.css` from the user config directory when `color-scheme` changes —
that dark-variant mechanism only works inside the theme directory. To get proper
dark/light switching, write a single combined file using
`@media (prefers-color-scheme: dark)`, which GTK4 4.x maps from the
`color-scheme` gsettings value:

```bash
THEME_DIR="$HOME/.local/share/themes/flexoki"
GTK4_DIR="$HOME/.config/gtk-4.0"
mkdir -p "$GTK4_DIR"

light=$(grep '^@define-color' "$THEME_DIR/gtk-4.0/gtk.css")
dark=$(grep  '^@define-color' "$THEME_DIR/gtk-4.0/gtk-dark.css" | sed 's/^/  /')

cat > "$GTK4_DIR/gtk.css" << EOF
${light}

@media (prefers-color-scheme: dark) {
${dark}
}

@import '${THEME_DIR}/gtk-3.0/libadwaita.css';
@import '${THEME_DIR}/gtk-3.0/libadwaita-tweaks.css';
EOF
```

Using absolute paths in `@import` avoids path resolution issues that arise with
symlinks. The `install.sh` script handles all of this automatically.

To revert GTK3 to the default:

```bash
gsettings reset org.gnome.desktop.interface gtk-theme
```

GTK searches for themes in `~/.local/share/themes/` (user) and `/usr/share/themes/` (system).
The directory name must match the value of `GtkTheme` in `index.theme`.

## Building

Requires Node.js. Run from `src/`:

```bash
cd src
npm install   # first time only
npm run build
```

This regenerates five files in `theme/` from the color mapping in `src/mapping.ts`:

| Generated file | Contents |
|---|---|
| `gtk-3.0/gtk.css` | Light color variables + `@import widgets.css` |
| `gtk-3.0/gtk-dark.css` | Dark color variables + `@import widgets-dark.css` |
| `gtk-3.0/libadwaita-tweaks.css` | GNOME palette overrides + notebook header fix |
| `gtk-4.0/gtk.css` | Light semantic colors + `@import libadwaita.css` |
| `gtk-4.0/gtk-dark.css` | Dark semantic colors + `@import libadwaita.css` |

Everything else in `theme/` is static and never overwritten by the build.

**To change a color:** edit `src/mapping.ts`, then run `npm run build` and reinstall.

## Testing

The test program `src/test-colors.c` loads both `gtk-4.0/gtk.css` and `gtk-4.0/gtk-dark.css`
and verifies that every named color resolves to the expected Flexoki hex value using
`gtk_style_context_lookup_color()`.

Build and run from `src/`:

```bash
cd src
gcc $(pkg-config --cflags --libs gtk4) -lm -o test-colors test-colors.c
GDK_BACKEND=x11 DISPLAY=:0 ./test-colors
```

Expected output: `44 passed, 0 failed` for both light and dark modes.

To check for CSS parse errors in the generated files (deprecation warnings from the
static `libadwaita.css` upstream file are expected and harmless):

```bash
GTK_DEBUG=css GDK_BACKEND=x11 DISPLAY=:0 ./test-colors 2>&1 | grep -i error
```

## Directory layout

```
src/
  mapping.ts          color mapping: Flexoki palette → GTK named colors (edit to change colors)
  generate.ts         generator entry point
  test-colors.c       color resolution test program
  package.json
  tsconfig.json

theme/                installable GTK theme (output of npm run build)
  index.theme         theme metadata, required by GNOME Tweaks
  gtk-3.0/
    gtk.css           GENERATED — light color variables
    gtk-dark.css      GENERATED — dark color variables
    libadwaita-tweaks.css  GENERATED — GNOME palette overrides + notebook fix
    widgets.css       static — adw-gtk3 light widget styles
    widgets-dark.css  static — adw-gtk3 dark widget styles
    libadwaita.css    static — adw-gtk3 libadwaita compat layer (GTK4 imports this)
    assets/           static — slider and checkbox images
  gtk-4.0/
    gtk.css           GENERATED — light semantic colors
    gtk-dark.css      GENERATED — dark semantic colors
```

## Color mapping

All colors originate from `src/mapping.ts` against the canonical Flexoki palette
defined in `../_generators/src/palette.ts`. They are grouped into four layers:

| Layer | Scope | Variables |
|---|---|---|
| 1 | GTK3 + GTK4 | `accent_*`, `destructive_*`, `success_*`, `warning_*`, `error_*`, `window_*`, `view_*`, `headerbar_*`, `sidebar_*`, `card_*`, `dialog_*`, `popover_*`, `thumbnail_*`, `shade_color`, `scrollbar_outline_color` |
| 2 | GTK4 only | `secondary_sidebar_*` (5 variables, not present in adw-gtk3) |
| 3 | GTK3 only | `incognito_bg_color`, `new_title_bg_color`, `panel_bg_color`, `panel_fg_color` |
| 4 | GTK3 GNOME palette | `blue_1~5`, `green_1~5`, `yellow_1~5`, `orange_1~5`, `red_1~5`, `purple_1~5`, `brown_1~5`, `light_1~5`, `dark_1~5` — overrides the GNOME defaults in `libadwaita.css` |

The standard accent color convention used throughout:

- **400-series** (e.g. `#4385BE`) — light-mode foreground accents and dark-mode button backgrounds
- **600-series** (e.g. `#205EA6`) — dark-mode foreground accents and light-mode button backgrounds

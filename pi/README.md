# Flexoki for Pi and Oh My Pi

A Flexoki port for terminal coding agents in the [pi](https://github.com/earendil-works/pi) family. Includes `flexoki-dark` and `flexoki-light`.

**These same two files work with both agents:**

- [pi](https://github.com/earendil-works/pi) — the upstream `pi` coding agent
- [Oh My Pi](https://github.com/can1357/oh-my-pi) — the `omp` fork

Oh My Pi adds 15 color tokens that pi does not have (`pythonMode` and the 14 `statusLine*` tokens). The files define all of them, and pi ignores the ones it does not use, so a single pair of themes covers both. No separate variants are needed.

## Flexoki Dark

![Flexoki Dark - Pi](screenshots/dark.png)

## Flexoki Light

![Flexoki Light - Pi](screenshots/light.png)

## Installation

Custom themes are JSON files discovered by filename in the agent's themes directory. Copy them to whichever agent you use — or both.

**pi:**

```sh
mkdir -p ~/.pi/agent/themes
cp flexoki-dark.json flexoki-light.json ~/.pi/agent/themes/
```

**Oh My Pi:**

```sh
mkdir -p ~/.omp/agent/themes
cp flexoki-dark.json flexoki-light.json ~/.omp/agent/themes/
```

Both agents read `PI_CODING_AGENT_DIR`; if you have set it, use `$PI_CODING_AGENT_DIR/themes` instead. Oh My Pi profiles created with `omp --profile <name>` keep their own agent directory, so copy the files there as well if you use them.

## Usage

### pi

pi uses a single `theme` setting in `~/.pi/agent/settings.json`. A `light/dark` pair switches automatically based on your terminal's background:

```json
{
  "theme": "flexoki-light/flexoki-dark"
}
```

The light theme goes before the slash and the dark theme after it. To pin one theme instead, set `"theme": "flexoki-dark"`.

### Oh My Pi

Run `omp`, then choose the themes in Settings → Appearance → Theme:

- **Dark Theme** — `flexoki-dark`
- **Light Theme** — `flexoki-light`

Oh My Pi picks between the two automatically based on your terminal's background. You can also set them directly from the shell:

```sh
omp config set theme.dark flexoki-dark
omp config set theme.light flexoki-light
```

Both agents watch theme files for changes, so edits apply immediately without restarting.

## Palette

The themes use Flexoki's semantic names as theme `vars`, so the mapping reads directly against the [Flexoki documentation](https://stephango.com/flexoki). Dark uses the `400` accent weights on `black`/`base-950` backgrounds; light uses the `600` accent weights on `paper`/`base-50` backgrounds.

Syntax roles follow the [Helix](../helix) and [VS Code](../vscode) Flexoki ports: keywords are green, functions orange, strings cyan, numbers purple, types yellow, and comments, operators and punctuation use the neutral `tx-2` tone.

The `$schema` reference points at Oh My Pi's theme schema, which covers every token these files define. pi ships a stricter JSON Schema that rejects unknown keys, so an editor validating against pi's schema will flag the 15 Oh My Pi tokens — pi itself accepts and ignores them at runtime.

## Credits

Flexoki by [Steph Ango](https://stephango.com/flexoki).

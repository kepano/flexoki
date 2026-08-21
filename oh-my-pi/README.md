# Flexoki for Oh My Pi

A Flexoki port for [Oh My Pi](https://github.com/can1357/oh-my-pi), a terminal coding agent. Includes `flexoki-dark` and `flexoki-light`.

## Installation

Custom themes are JSON files discovered by filename in Oh My Pi's themes directory:

```sh
mkdir -p ~/.omp/agent/themes
cp flexoki-dark.json flexoki-light.json ~/.omp/agent/themes/
```

If you have set `PI_CODING_AGENT_DIR`, use `$PI_CODING_AGENT_DIR/themes` instead. Profiles created with `omp --profile <name>` keep their own agent directory, so copy the files there as well if you use them.

## Usage

Run `omp`, then choose the themes in Settings → Appearance → Theme:

- **Dark Theme** — `flexoki-dark`
- **Light Theme** — `flexoki-light`

Oh My Pi picks between the two automatically based on your terminal's background. You can also set them directly from the shell:

```sh
omp config set theme.dark flexoki-dark
omp config set theme.light flexoki-light
```

Theme files are watched for changes, so edits apply immediately without restarting.

## Palette

The themes use Flexoki's semantic names as theme `vars`, so the mapping reads directly against the [Flexoki documentation](https://stephango.com/flexoki). Dark uses the `400` accent weights on `black`/`base-950` backgrounds; light uses the `600` accent weights on `paper`/`base-50` backgrounds.

Syntax roles follow the [Helix](../helix) and [VS Code](../vscode) Flexoki ports: keywords are green, functions orange, strings cyan, numbers purple, types yellow, and comments, operators and punctuation use the neutral `tx-2` tone.

## Credits

Flexoki by [Steph Ango](https://stephango.com/flexoki).

# Flexoki for Oh My Zsh

A Flexoki port for [Oh My Zsh](https://ohmyz.sh). Includes `flexoki-dark` and `flexoki-light` themes.

## Installation

Install the theme files in your Oh My Zsh custom themes directory:

```sh
mkdir -p "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes"
cp flexoki-dark.zsh-theme flexoki-light.zsh-theme "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/"
```

## Usage

Set the theme in `~/.zshrc`:

```sh
ZSH_THEME="flexoki-dark"
```

or for the light variant:

```sh
ZSH_THEME="flexoki-light"
```

Then restart your shell:

```sh
exec zsh
```

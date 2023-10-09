# Flexoki for theme.sh

This directory contains instructions and files for adding Flexoki to [theme.sh](https://github.com/lemnos/theme.sh).

## Via `make`

To build theme.sh with Flexoki, clone its repository, download the theme files into the `themes` directory and run `make`.

```Shell
git clone https://github.com/lemnos/theme.sh.git
cd theme.sh
wget -P themes https://github.com/kepano/flexoki/raw/main/theme.sh/flexoki-{light,dark}
make
```

The build will be located at `bin/theme.sh` and include the `flexoki-light` and `flexoki-dark` themes.

## Via kitty theme

theme.sh also has support for [kitty](https://sw.kovidgoyal.net/kitty/) themes. To use Flexoki's kitty port, run the following (assuming you already have theme.sh installed):

```Shell
wget https://github.com/kepano/flexoki/raw/main/kitty/flexoki_{light,dark}.conf
theme.sh -a flexoki_{light,dark}.conf
rm flexoki_{light,dark}.conf
```

This will add the `flexoki_light` and `flexoki_dark` themes to your existing installation.

## Manually

Though generally not recommended, you can also manually append the themes to theme.sh using something like the following:

```Shell
wget https://github.com/kepano/flexoki/raw/main/theme.sh/flexoki-{light,dark}
sed -i "s/color//" flexoki-{light,dark}
sed -i "s/ /: /" flexoki-{light,dark}
(echo flexoki-light; cat flexoki-light; echo) >> $(which theme.sh)
(echo flexoki-dark; cat flexoki-dark) >> $(which theme.sh)
rm flexoki-{light,dark}
```

This will add the `flexoki-light` and `flexoki-dark` themes to your existing installation.

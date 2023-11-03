* Usage

1. Copy selected mode or flexoki-full for raw range to `~/.config/waybar/`
2. Include the file at the top of your `style.css`:
```css
@import "<mode>.css";
```
3. Use imported colours:
```css
* {
  /* reference the color by using @color-name */

  color: @tx;
  /* or if you're using flexoki-full, */
  color: @base-200;
}
```

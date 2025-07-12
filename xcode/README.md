# Flexoki for Xcode

## Installation

1. Download the `.xccolortheme` files:
   - `Flexoki Dark.xccolortheme`
   - `Flexoki Light.xccolortheme`

2. Copy the files to your Xcode themes directory:
   ```bash
   cp "Flexoki Dark.xccolortheme" ~/Library/Developer/Xcode/UserData/FontAndColorThemes/
   cp "Flexoki Light.xccolortheme" ~/Library/Developer/Xcode/UserData/FontAndColorThemes/
   ```

3. Restart Xcode

4. Go to **Xcode > Preferences > Themes** and select either "Flexoki Dark" or "Flexoki Light"

## Color Mapping

The themes use the following Flexoki colors:

### Dark Theme
- Background: `#100F0F` RGB(16, 15, 15) - **black**
- Foreground: `#CECDC3` RGB(206, 205, 195) - **base-200**
- Comments: `#878580` RGB(135, 133, 128) - **base-500**
- Keywords: `#879A39` RGB(135, 154, 57) - **green-400**
- Strings: `#3AA99F` RGB(58, 169, 159) - **cyan-400**
- Numbers: `#8B7EC8` RGB(139, 126, 200) - **purple-400**
- Functions: `#DA702C` RGB(218, 112, 44) - **orange-400**
- Types: `#D0A215` RGB(208, 162, 21) - **yellow-400**

### Light Theme
- Background: `#FFFCF0` RGB(255, 252, 240) - **paper**
- Foreground: `#100F0F` RGB(16, 15, 15) - **black**
- Comments: `#5A5955` RGB(90, 89, 85) - *custom (between base-600 and base-700)*
- Doc comments: `#8B8A82` RGB(139, 138, 130) - *custom (between base-500 and base-600)*
- Keywords: `#66800B` RGB(102, 128, 11) - **green-600**
- Strings: `#24837B` RGB(36, 131, 123) - **cyan-600**
- Numbers: `#5E409D` RGB(94, 64, 157) - **purple-600**
- Functions: `#BC5215` RGB(188, 82, 21) - **orange-600**
- Types: `#AD8301` RGB(173, 131, 1) - **yellow-600**
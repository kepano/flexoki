import { join } from 'path'
import { mkdir, writeFile } from 'fs/promises'
import { Color } from './color'
import { palette } from './palette'

type iTerm2Key =
    | 'Ansi 0 Color'
    | 'Ansi 1 Color'
    | 'Ansi 2 Color'
    | 'Ansi 3 Color'
    | 'Ansi 4 Color'
    | 'Ansi 5 Color'
    | 'Ansi 6 Color'
    | 'Ansi 7 Color'
    | 'Ansi 8 Color'
    | 'Ansi 9 Color'
    | 'Ansi 10 Color'
    | 'Ansi 11 Color'
    | 'Ansi 12 Color'
    | 'Ansi 13 Color'
    | 'Ansi 14 Color'
    | 'Ansi 15 Color'
    | 'Background Color'
    | 'Foreground Color'
    | 'Link Color'
    | 'Bold Color'
    | 'Cursor Color'
    | 'Cursor Text Color'
    | 'Cursor Guide Color'
    | 'Selection Color'
    | 'Selected Text Color'

type iTerm2ColorScheme = Record<iTerm2Key, Color>

function generateITerm2ColorSchemeFile (colorScheme: iTerm2ColorScheme): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${
  Object.entries(colorScheme)
    .map(([key, color]) => {
      const { red, green, blue, alpha } = color.asFloat
      return `    <key>${key}</key>
    <dict>
        <key>Color Space</key>
        <string>sRGB</string>
        <key>Red Component</key>
        <real>${red}</real>
        <key>Green Component</key>
        <real>${green}</real>
        <key>Blue Component</key>
        <real>${blue}</real>
        <key>Alpha Component</key>
        <real>${alpha}</real>
    </dict>`
    }).join('\n')}
</dict>
</plist>`
}

const flexokiDarkColorScheme: iTerm2ColorScheme = {
  'Ansi 0 Color': palette.dt_bg,
  'Ansi 1 Color': palette.dt_re,
  'Ansi 2 Color': palette.dt_gr,
  'Ansi 3 Color': palette.dt_ye,
  'Ansi 4 Color': palette.dt_bl,
  'Ansi 5 Color': palette.dt_ma,
  'Ansi 6 Color': palette.dt_cy,
  'Ansi 7 Color': palette.dt_tx_2,
  'Ansi 8 Color': palette.dt_tx_3,
  'Ansi 9 Color': palette.dt_re_2,
  'Ansi 10 Color': palette.dt_gr_2,
  'Ansi 11 Color': palette.dt_ye_2,
  'Ansi 12 Color': palette.dt_bl_2,
  'Ansi 13 Color': palette.dt_ma_2,
  'Ansi 14 Color': palette.dt_cy_2,
  'Ansi 15 Color': palette.dt_tx,
  'Background Color': palette.dt_bg,
  'Foreground Color': palette.dt_tx,
  'Link Color': palette.paper,
  'Bold Color': palette.paper,
  'Cursor Color': palette.dt_tx,
  'Cursor Text Color': palette.dt_bg,
  'Cursor Guide Color': palette.paper,
  'Selection Color': palette.dt_tx,
  'Selected Text Color': palette.dt_bg
}

const flexokiDarkDimmedColorScheme: iTerm2ColorScheme =
  Object.assign<iTerm2ColorScheme, Partial<iTerm2ColorScheme>>(
    { ...flexokiDarkColorScheme },
    {
      'Ansi 0 Color': palette.dt_bg_2,
      'Background Color': palette.dt_bg_2,
      'Cursor Text Color': palette.dt_bg_2,
      'Selected Text Color': palette.dt_bg_2
    }
  )

const flexokiLightColorScheme: iTerm2ColorScheme = {
  'Ansi 0 Color': palette.lt_tx,
  'Ansi 1 Color': palette.lt_re,
  'Ansi 2 Color': palette.lt_gr,
  'Ansi 3 Color': palette.lt_ye,
  'Ansi 4 Color': palette.lt_bl,
  'Ansi 5 Color': palette.lt_ma,
  'Ansi 6 Color': palette.lt_cy,
  'Ansi 7 Color': palette.lt_tx_2,
  'Ansi 8 Color': palette.lt_tx_3,
  'Ansi 9 Color': palette.lt_re_2,
  'Ansi 10 Color': palette.lt_gr_2,
  'Ansi 11 Color': palette.lt_ye_2,
  'Ansi 12 Color': palette.lt_bl_2,
  'Ansi 13 Color': palette.lt_ma_2,
  'Ansi 14 Color': palette.lt_cy_2,
  'Ansi 15 Color': palette.lt_ui_3,
  'Background Color': palette.lt_bg,
  'Foreground Color': palette.lt_tx,
  'Link Color': palette.lt_tx_2,
  'Bold Color': palette.paper,
  'Cursor Color': palette.lt_tx,
  'Cursor Text Color': palette.lt_bg,
  'Cursor Guide Color': palette.paper,
  'Selection Color': palette.lt_tx_2,
  'Selected Text Color': palette.lt_bg
}

const flexokiLightDimmedColorScheme: iTerm2ColorScheme =
  Object.assign<iTerm2ColorScheme, Partial<iTerm2ColorScheme>>(
    { ...flexokiLightColorScheme },
    {
      'Background Color': palette.lt_bg_2,
      'Cursor Text Color': palette.lt_bg_2,
      'Selected Text Color': palette.lt_bg_2
    }
  )

const colorSchemes: Record<string, iTerm2ColorScheme> = {
  'Dark': flexokiDarkColorScheme,
  'Dark Dimmed': flexokiDarkDimmedColorScheme,
  'Light': flexokiLightColorScheme,
  'Light Dimmed': flexokiLightDimmedColorScheme
}

export async function generateITerm2ColorSchemes() {
  const targetFolder = join(process.cwd(), '..', 'iterm2')
  await mkdir(targetFolder, { recursive: true })

  for (const [name, colorScheme] of Object.entries(colorSchemes)) {
    const sanitizedName = name.replaceAll(' ', '_').toLocaleLowerCase()
    const filename = `flexoki_${sanitizedName}.itermcolors`
    const content = generateITerm2ColorSchemeFile(colorScheme)
    await writeFile(join(targetFolder, filename), content)
    console.log(`Generated ${name} color scheme for iTerm2`)
  }
}
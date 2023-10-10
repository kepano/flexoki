export class Color {
    private constructor (
      private readonly red = 255,
      private readonly green = 255,
      private readonly blue = 255,
      private readonly alpha = 255
    ) {}

    static fromHex(color: string): Color {
      const sanitized = color.replace('#', '')

      if (sanitized.length !== 6 && sanitized.length !== 8) {
        throw new Error('Bad color format, should be #001122 or #00112233')
      }

      const colorComponents: number[] = []
      for (let i = 1; i < sanitized.length; i += 2) {
        const firstByte = sanitized[i - 1]
        const secondByte = sanitized[i]

        if (firstByte && secondByte) {
            colorComponents.push(parseInt(firstByte + secondByte, 16))
        }
      }
      return new Color(
        colorComponents.shift(),
        colorComponents.shift(),
        colorComponents.shift(),
        colorComponents.shift()
      )
    }

    get asHexRGBA(): string {
      return [
        '#',
        this.red.toString(16).padStart(2, '0'),
        this.green.toString(16).padStart(2, '0'),
        this.blue.toString(16).padStart(2, '0'),
        this.alpha.toString(16).padStart(2, '0')
      ].join('')
    }

    get asHexRGB(): string {
      return [
        '#',
        this.red.toString(16).padStart(2, '0'),
        this.green.toString(16).padStart(2, '0'),
        this.blue.toString(16).padStart(2, '0')
      ].join('')
    }

    get asFloat(): { red: number, green: number, blue: number, alpha: number } {
      return {
        red: this.red / 255,
        green: this.green / 255,
        blue: this.blue / 255,
        alpha: this.alpha / 255
      }
    }
  }

import { Color } from "./color"

// lt - light tones
// dt - dark tones
export const palette: Record<string, Color> = {
    // Black, white and gray
    black: Color.fromHex('#100F0F'),
    lt_tx: Color.fromHex('#100F0F'),
    dt_bg: Color.fromHex('#100F0F'),

    950: Color.fromHex('#1C1B1A'),
    dt_bg_2: Color.fromHex('#1C1B1A'),

    900: Color.fromHex('#282726'),
    dt_ui: Color.fromHex('#282726'),

    850: Color.fromHex('#343331'),
    dt_ui_2: Color.fromHex('#343331'),

    800: Color.fromHex('#403E3C'),
    dt_ui_3: Color.fromHex('#403E3C'),

    700: Color.fromHex('#575653'),
    dt_tx_3: Color.fromHex('#575653'),

    600: Color.fromHex('#6F6E69'),
    lt_tx_2: Color.fromHex('#6F6E69'),

    500: Color.fromHex('#878580'),
    dt_tx_2: Color.fromHex('#878580'),

    300: Color.fromHex('#B7B5AC'),
    lt_tx_3: Color.fromHex('#B7B5AC'),

    200: Color.fromHex('#CECDC3'),
    lt_ui_3: Color.fromHex('#CECDC3'),
    dt_tx: Color.fromHex('#CECDC3'),

    150: Color.fromHex('#DAD8CE'),
    lt_ui_2: Color.fromHex('#DAD8CE'),

    100: Color.fromHex('#E6E4D9'),
    lt_ui: Color.fromHex('#E6E4D9'),

    50: Color.fromHex('#F2F0E5'),
    lt_bg_2: Color.fromHex('#F2F0E5'),

    paper: Color.fromHex('#FFFCF0'),
    lt_bg: Color.fromHex('#FFFCF0'),

    // Other colors
    // Dark tones
    lt_re: Color.fromHex('#AF3029'),
    dt_re_2: Color.fromHex('#AF3029'),

    lt_or: Color.fromHex('#BC5215'),
    dt_or_2: Color.fromHex('#BC5215'),

    lt_ye: Color.fromHex('#AD8301'),
    dt_ye_2: Color.fromHex('#AD8301'),

    lt_gr: Color.fromHex('#66800B'),
    dt_gr_2: Color.fromHex('#66800B'),

    lt_cy: Color.fromHex('#24837B'),
    dt_cy_2: Color.fromHex('#24837B'),

    lt_bl: Color.fromHex('#205EA6'),
    dt_bl_2: Color.fromHex('#205EA6'),

    lt_pu: Color.fromHex('#5E409D'),
    dt_pu_2: Color.fromHex('#5E409D'),

    lt_ma: Color.fromHex('#A02F6F'),
    dt_ma_2: Color.fromHex('#A02F6F'),

    // Light tones
    lt_re_2: Color.fromHex('#D14D41'),
    dt_re: Color.fromHex('#D14D41'),

    lt_or_2: Color.fromHex('#DA702C'),
    dt_or: Color.fromHex('#DA702C'),

    lt_ye_2: Color.fromHex('#D0A215'),
    dt_ye: Color.fromHex('#D0A215'),

    lt_gr_2: Color.fromHex('#879A39'),
    dt_gr: Color.fromHex('#879A39'),

    lt_cy_2: Color.fromHex('#3AA99F'),
    dt_cy: Color.fromHex('#3AA99F'),

    lt_bl_2: Color.fromHex('#4385BE'),
    dt_bl: Color.fromHex('#4385BE'),

    lt_pu_2: Color.fromHex('#8B7EC8'),
    dt_pu: Color.fromHex('#8B7EC8'),

    lt_ma_2: Color.fromHex('#CE5D97'),
    dt_ma: Color.fromHex('#CE5D97')
}
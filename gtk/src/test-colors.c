/*
 * Flexoki GTK theme color resolution test.
 * Loads the generated gtk.css / gtk-dark.css and verifies that every
 * named color resolves to the expected Flexoki hex value.
 *
 * Build:
 *   gcc $(pkg-config --cflags --libs gtk4) -o test-colors test-colors.c
 * Run:
 *   GTK_THEME=flexoki ./test-colors
 */

#include <gtk/gtk.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

/* ── expected values ────────────────────────────────────────────────────────
 * Each entry: { "var_name", light_hex, dark_hex }
 * hex is 6-digit lowercase, or NULL to skip that mode.
 * rgba() entries are skipped (marked with "-").
 */
typedef struct { const char *name; const char *light; const char *dark; } Expect;

static const Expect EXPECTED[] = {
    /* Layer 1 – shared semantic */
    { "accent_color",              "205ea6", "4385be" },
    { "accent_bg_color",           "4385be", "205ea6" },
    { "accent_fg_color",           "fffcf0", "cecdc3" },
    { "destructive_color",         "af3029", "d14d41" },
    { "destructive_bg_color",      "d14d41", "af3029" },
    { "destructive_fg_color",      "fffcf0", "cecdc3" },
    { "success_color",             "66800b", "879a39" },
    { "success_bg_color",          "879a39", "66800b" },
    { "success_fg_color",          "fffcf0", "cecdc3" },
    { "warning_color",             "ad8301", "d0a215" },
    { "warning_bg_color",          "d0a215", "ad8301" },
    { "error_color",               "af3029", "d14d41" },
    { "error_bg_color",            "d14d41", "af3029" },
    { "error_fg_color",            "fffcf0", "cecdc3" },
    { "window_bg_color",           "fffcf0", "100f0f" },
    { "window_fg_color",           "100f0f", "cecdc3" },
    { "view_bg_color",             "fffcf0", "1c1b1a" },
    { "view_fg_color",             "100f0f", "cecdc3" },
    { "headerbar_bg_color",        "fffcf0", "100f0f" },
    { "headerbar_fg_color",        "100f0f", "cecdc3" },
    { "headerbar_border_color",    "e6e4d9", "282726" },
    { "headerbar_backdrop_color",  "f2f0e5", "1c1b1a" },
    { "sidebar_bg_color",          "fffcf0", "100f0f" },
    { "sidebar_fg_color",          "100f0f", "cecdc3" },
    { "sidebar_backdrop_color",    "f2f0e5", "1c1b1a" },
    { "card_bg_color",             "fffcf0", "100f0f" },
    { "card_fg_color",             "100f0f", "cecdc3" },
    { "dialog_bg_color",           "fffcf0", "100f0f" },
    { "dialog_fg_color",           "100f0f", "cecdc3" },
    { "popover_bg_color",          "fffcf0", "100f0f" },
    { "popover_fg_color",          "100f0f", "cecdc3" },
    { "thumbnail_bg_color",        "e6e4d9", "100f0f" },
    { "thumbnail_fg_color",        "fffcf0", "fffcf0" },
    { "shade_color",               "f2f0e5", "1c1b1a" },
    /* Layer 2 – GTK4-only */
    { "secondary_sidebar_bg_color",       "f2f0e5", "1c1b1a" },
    { "secondary_sidebar_fg_color",       "100f0f", "cecdc3" },
    { "secondary_sidebar_backdrop_color", "e6e4d9", "282726" },
    /* Layer 4 – GNOME palette sample */
    { "blue_1",   "92bfdb", "92bfdb" },
    { "blue_3",   "4385be", "4385be" },
    { "blue_5",   "1a4f8c", "1a4f8c" },
    { "red_2",    "d14d41", "d14d41" },
    { "green_4",  "66800b", "66800b" },
    { "light_1",  "fffcf0", "fffcf0" },
    { "dark_5",   "100f0f", "100f0f" },
};

/* ── helpers ─────────────────────────────────────────────────────────────── */

static void gdk_rgba_to_hex(const GdkRGBA *c, char out[7])
{
    snprintf(out, 7, "%02x%02x%02x",
             (int)roundf(c->red   * 255),
             (int)roundf(c->green * 255),
             (int)roundf(c->blue  * 255));
}

static int run_checks(GtkWidget *widget, const char *mode_label, int mode_idx)
{
    GtkStyleContext *ctx = gtk_widget_get_style_context(widget);
    int pass = 0, fail = 0, skip = 0;
    int n = (int)(sizeof(EXPECTED) / sizeof(EXPECTED[0]));

    printf("\n── %s mode ──────────────────────────────\n", mode_label);

    for (int i = 0; i < n; i++) {
        const char *expected = (mode_idx == 0) ? EXPECTED[i].light : EXPECTED[i].dark;
        if (!expected || expected[0] == '-') { skip++; continue; }

        GdkRGBA color = {0};
        gboolean found = gtk_style_context_lookup_color(ctx, EXPECTED[i].name, &color);
        if (!found) {
            printf("  MISS  %-42s (not found)\n", EXPECTED[i].name);
            fail++;
            continue;
        }

        char got[7];
        gdk_rgba_to_hex(&color, got);

        if (strcasecmp(got, expected) == 0) {
            printf("  PASS  %-42s #%s\n", EXPECTED[i].name, got);
            pass++;
        } else {
            printf("  FAIL  %-42s expected #%s  got #%s\n",
                   EXPECTED[i].name, expected, got);
            fail++;
        }
    }

    printf("\n  Results: %d passed, %d failed, %d skipped\n", pass, fail, skip);
    return fail;
}

/* ── main ─────────────────────────────────────────────────────────────────── */

int main(int argc, char *argv[])
{
    gtk_init();

    GtkWidget *win = gtk_window_new();
    gtk_widget_realize(win);

    int total_fail = 0;

    /* ---- Light mode ---- */
    GtkCssProvider *light_prov = gtk_css_provider_new();
    char light_path[512];
    snprintf(light_path, sizeof(light_path), "%s/../theme/gtk-4.0/gtk.css",
             /* __FILE__ gives absolute path to this source, use argv[0] dir instead */
             g_path_get_dirname(argv[0]));
    gtk_css_provider_load_from_path(light_prov, light_path);
    gtk_style_context_add_provider_for_display(
        gtk_widget_get_display(win),
        GTK_STYLE_PROVIDER(light_prov),
        GTK_STYLE_PROVIDER_PRIORITY_USER);

    total_fail += run_checks(win, "Light", 0);

    gtk_style_context_remove_provider_for_display(
        gtk_widget_get_display(win),
        GTK_STYLE_PROVIDER(light_prov));
    g_object_unref(light_prov);

    /* ---- Dark mode ---- */
    GtkCssProvider *dark_prov = gtk_css_provider_new();
    char dark_path[512];
    snprintf(dark_path, sizeof(dark_path), "%s/../theme/gtk-4.0/gtk-dark.css",
             g_path_get_dirname(argv[0]));
    gtk_css_provider_load_from_path(dark_prov, dark_path);
    gtk_style_context_add_provider_for_display(
        gtk_widget_get_display(win),
        GTK_STYLE_PROVIDER(dark_prov),
        GTK_STYLE_PROVIDER_PRIORITY_USER);

    total_fail += run_checks(win, "Dark", 1);

    printf("\n══ Total failures: %d ══\n\n", total_fail);
    return total_fail > 0 ? 1 : 0;
}

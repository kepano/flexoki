# USAGE  
Put these files in `~/.config/gtk-3.0/` and `~/.config/gtk-4.0/`  
Or you can chose where to place them.  
  
But only `~/.config/gtk-x.0/gtk.css` can work.  
For Example: You **must** rename `gtk-flexoki-light.css` to `gtk.css` in `~/.config/gtk-x.0/` to switch to light mode.  

# Example script
stay light mode at 6am ~ 6pm
dark mode 6pm ~ 6am
```
if [ $current_hour -ge 6 ] && [ $current_hour -lt 18 ]; then
    gsettings set org.gnome.desktop.interface color-scheme prefer-light
    gsettings set org.gnome.desktop.interface gtk-theme Adw-gtk3
    cp ~/.config/gtk-3.0/gtk-flexoki-light.css ~/.config/gtk-3.0/gtk.css
    cp ~/.config/gtk-4.0/gtk-flexoki-light.css ~/.config/gtk-4.0/gtk.css
else
    gsettings set org.gnome.desktop.interface color-scheme prefer-dark
    gsettings set org.gnome.desktop.interface gtk-theme Adw-gtk3-dark
    cp ~/.config/gtk-3.0/gtk-flexoki-dark.css ~/.config/gtk-3.0/gtk.css
    cp ~/.config/gtk-4.0/gtk-flexoki-dark.css ~/.config/gtk-4.0/gtk.css
fi
```

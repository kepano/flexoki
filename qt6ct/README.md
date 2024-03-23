# USAGE
Put these two files in `~/.config/qt6ct/colors/` or `~/.config/qt5ct/colors/`

# Example script
stay light mode at 6am ~ 6pm
dark mode 6pm ~ 6am
```
#!/bin/bash
qtlight='~\/.config\/qt6ct\/colors\/flexoki-light.conf'
qtdark='~\/.config\/qt6ct\/colors\/flexoki-dark.conf'

if [ $current_hour -ge 6 ] && [ $current_hour -lt 18 ]; then
    sed -i "0,/^color_scheme_path.*/{s/=.*/=$qtlight/}" ~/.config/qt6ct/qt6ct.conf
else
    sed -i "0,/^color_scheme_path.*/{s/=.*/=$qtdark/}" ~/.config/qt6ct/qt6ct.conf
fi
```


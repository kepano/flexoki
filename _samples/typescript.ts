import { Plugin } from "obsidian";

export default class SystemDarkMode extends Plugin {
  async onload() {
    // Watch for system changes to color theme
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const callback = () => {
      if (media.matches) {
        console.log("Dark mode active");
        this.updateStyle(true);
      } else {
        console.log("Light mode active");
        this.updateStyle(false);
      }
    };

    media.addEventListener("change", callback);

    // Remove listener when we unload
    this.register(() => media.removeEventListener("change", callback));

    callback();
  }
}

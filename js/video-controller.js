/**
 * Class representing the video player controller.
 */
import scssVars from "!!sass-variable-loader?preserveVariableNames!../scss/util/_variables.scss";

export default class VideoController {
  constructor(wrapperSelector, controllerSelector) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.controller = document.querySelector(controllerSelector);

    if (this.wrapper && this.controller) {
      this.video = this.wrapper.getElementsByTagName("video")[0];

      this.#controlState();
      this.#autoplayDesktop();
    }
  }

  // control video state on wrapper click
  #controlState() {
    this.wrapper.addEventListener("click", () => {
      if (this.video.paused) {
        this.controller.checked = false;
        this.video.play();
      } else {
        this.controller.checked = true;
        this.video.pause();
      }
    });
  }

  #autoplayDesktop() {
    const breakpoint = "(min-width: " + scssVars["breakpointDesktop"] + ")";
    this.desktopView = window.matchMedia(breakpoint);

    if (this.desktopView.matches) {
      this.video.play();
    }
  }
}

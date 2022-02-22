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
      this.#playVideoOnBreakpoints();
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

  #playVideoOnBreakpoints() {
    const breakpoint = "(max-width: " + scssVars["breakpointDesktop"] + ")";
    this.mobileView = window.matchMedia(breakpoint);

    if (this.mobileView.matches) 
      this.video.setAttribute("poster", this.video.getAttribute("data-poster"));
    else
      this.video.play();
  }
}

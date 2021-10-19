/**
 * Class representing the video player controller.
 */
export default class VideoController {
  constructor(wrapperSelector, controllerSelector) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.controller = document.querySelector(controllerSelector);
    this.video = this.wrapper.getElementsByTagName("video")[0];

    this.#controlState();
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
}

export default class ContentSlider {
  /**
   * TODO:
   * !! - Fix the Controls repositioning logic in the resizeObserver.
   * !! - Investigate the reason the controls click area diverges from img div on different browser zoom levels
   *  - Fix tab indexes (user should not be able to scroll by tabbing // add visibility classes )
   *  - Refactor addition of event listeners into a separate function. DRY-er.
   *
   * Notes:
   *  - Clickable area off by 20px due to 2rem padding on .demo-section
   *  - Viewport top position start at [0, 79], not sure why.
   */
  constructor(sliderWrapper, controlSurface) {
    // check if there is a content slider
    this.contentSlider = document.querySelector(sliderWrapper);
    this.controlSurface = document.querySelector(controlSurface);

    if (this.contentSlider) {
      /**
       * TODO: update selectors to data-attributes
       * TODO: Refactor this so that it appends the controls div to the DOM, therefore removing the necesity for a controlSurface parameter to be passed in.
       */
      //get the DOM elements
      const contentSliderCardsList = this.contentSlider.querySelector(
        ".content-slider__cards-list"
      );
      this.contentSliderControls = this.contentSlider.querySelector(
        ".content-slider__controls"
      );
      // const controlSurface          = this.controlSurface;

      this.controlsLeft = this.contentSliderControls.querySelector(
        ".content-slider__controls-left"
      );
      this.controlsRight = this.contentSliderControls.querySelector(
        ".content-slider__controls-right"
      );

      this.resizeControlSurface();

      let intitialTopValue = this.contentSliderControlsRect.top; //79px
      let diff = 0;

      this.contentSliderControls.style.top = `${
        this.controlSurfaceRect.top - intitialTopValue
      }px`;

      // Event listeners
      // TODO: Refactor to a single function with behavior based on event.someValue
      this.controlsLeft.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft -= 500;
      });

      this.controlsRight.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft += 500;
      });

      window.addEventListener("resize", () => {
        this.resizeControlSurface();
      });

    } else {
      console.error("[Content Slider] No content slider found. Please make sure the .className parameter passed to the content slider exists and is correct.");
    }
  }

  resizeControlSurface() {
    this.controlSurfaceRect = this.controlSurface.getBoundingClientRect();
    this.contentSliderControlsRect = this.contentSliderControls.getBoundingClientRect();

    this.controlsLeft.style.height = `${this.controlSurfaceRect.height}px`;
    this.controlsRight.style.height = `${this.controlSurfaceRect.height}px`;
  }
}

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
  constructor(
    sliderWrapper = ".content-slider",
    controlSurface = ".content-block__upper"
  ) {
    this.contentSlider = document.querySelector(sliderWrapper);
    this.controlSurface = document.querySelector(controlSurface);

    if (this.contentSlider) {
      /**
       * TODO: Refactor controlSurface so that it appends the controls div to the DOM, therefore removing the necesity for a controlSurface parameter to be passed in.
       */
      // container for the items that will be scrolled
      this.contentSliderCardsList = this.contentSlider.querySelector(
        ".content-slider__cards-list"
      );
      // Needed to calculate the content slider's scrolling step.
      this.firstCard = this.contentSliderCardsList.querySelector(".content-slider__block");
      
      this.contentSliderControls = this.contentSlider.querySelector(
        ".content-slider__controls"
      );
      this.controlsLeft = this.contentSliderControls.querySelector(
        ".content-slider__controls-left"
      );
      this.controlsRight = this.contentSliderControls.querySelector(
        ".content-slider__controls-right"
      );
      this.attachEventListeners();
      this.resizeControlSurface();

      let intitialTopValue = this.contentSliderControlsRect.top; //79px

      this.contentSliderControls.style.top = `${
        this.controlSurfaceRect.top - intitialTopValue
      }px`;
    } else {
      console.error(
        "[Content Slider] No content slider found. Please make sure the .className parameter passed to the content slider exists and is correct."
      );
    }
  }

  resizeControlSurface() {
    this.controlSurfaceRect = this.controlSurface.getBoundingClientRect();
    this.contentSliderControlsRect =
      this.contentSliderControls.getBoundingClientRect();

    this.controlsLeft.style.height = `${this.controlSurfaceRect.height}px`;
    this.controlsRight.style.height = `${this.controlSurfaceRect.height}px`;
    
    // calculate the step size for the content slider
    this.sliderStep = this.firstCard.getBoundingClientRect().width;
  }

  attachEventListeners() {
    // TODO: Refactor to a single function with behavior based on event.someValue
    // TODO: Verify desired scroll on click behavior with design; 525px ensures at least one card is in view
    this.controlsLeft.addEventListener("click", (e) => {
      e.preventDefault();
      this.contentSliderCardsList.scrollLeft -= this.sliderStep; //px scroll amount
    });

    this.controlsRight.addEventListener("click", (e) => {
      e.preventDefault();
      this.contentSliderCardsList.scrollLeft += this.sliderStep; //px scroll amount
    });

    window.addEventListener("resize", () => {
      this.resizeControlSurface();
    });
  }
}

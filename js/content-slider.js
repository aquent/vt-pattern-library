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
  constructor(wrapperObj) {
    this.contentSlider = wrapperObj;
    let surfaceSelector = wrapperObj.dataset.controlSurface
      ? wrapperObj.dataset.controlSurface
      : "content-slider__cards-list";
    this.controlSurface = wrapperObj.querySelector(`.${surfaceSelector}`);
    this.hasLeftControl = false;
    this.initializeIntersectionObserver(this.contentSlider, this.controlSurface);

    try {
      /**
       * TODO: Refactor controlSurface so that it appends the controls div to the DOM, therefore removing the necesity for a controlSurface parameter to be passed in.
       */

      this.contentSliderCardsList = this.contentSlider.querySelector(
        ".content-slider__cards-list"
      );
      // Needed to calculate the content slider's scrolling step.
      this.firstCard = this.contentSliderCardsList.querySelector(
        ".content-slider__block"
      );
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

      let initialTopValue = this.contentSliderControls.offsetTop; //79px

      this.setControlSurface();

      this.contentSliderControls.style.top = `${
        this.controlSurface.offsetTop - initialTopValue
      }px`;
    } catch (e) {
      console.error(
        "[ContentSlider] There was a problem calculating the controls for the content slider: ",
        e
      );
    }
  }

  setControlSurface() {
    const controlSurfaceRect = this.controlSurface.getBoundingClientRect();
    this.contentSliderControls.style.height = `${controlSurfaceRect.height}px`;
    // calculate the step size for the content slider
    this.sliderStep = this.firstCard.offsetWidth;
  }

  attachEventListeners() {
    // TODO: Refactor to a single function with behavior based on event.someValue
    this.controlsLeft.addEventListener("click", (e) => {
      e.preventDefault();
      this.contentSliderCardsList.scrollLeft -= this.sliderStep; //px scroll amount
      console.log(this.hasLeftControl)

    });

    this.controlsRight.addEventListener("click", (e) => {
      console.log(this.hasLeftControl)

      e.preventDefault();
      this.contentSliderCardsList.scrollLeft += this.sliderStep; //px scroll amount
    });

    window.addEventListener("resize", () => {
      this.setControlSurface();
    });
  }

  /**
   * 
   * @param {HTMLElement} contentSlider  
   * @param {HTMLElement} controlSurface
   * @returns {void}
   */
  initializeIntersectionObserver(contentSlider) {
    console.log("[ContentSlider] Initializing Intersection Observer");

    let firstCard = contentSlider.querySelector(".content-slider__block");
    console.log(firstCard)
    const options = {
      root: contentSlider,
      threshold: [1, .9],
    };
    // TODO: Wrap this in a try/catch block
    let io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio < 1) {
          this.hasLeftControl = true;
          // append left and right controls to content slider
        } else {          
          // append right controls to content slider
          this.hasLeftControl = false;
        }
      });
    }, options);

    io.observe(firstCard);

  }

  /**
   * Appends the left and right controls to the content slider.
   * @param {HTMLElement} contentSlider
   * @return {void}
   */
  appendControls(contentSlider) {
    
  }

}

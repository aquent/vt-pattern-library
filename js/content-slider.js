export default class ContentSlider {
  /**
   * TODO:
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
      this.contentSliderControls.style.top = `${
        this.controlSurface.offsetTop - initialTopValue
      }px`;

      this.attachEventListeners();
      this.resizeCards();
      this.setControlSurface();
      this.initializeIntersectionObserver();
      this.contentSliderControls.style.top = `${this.controlSurface.offsetTop - initialTopValue
        }px`;
    } catch (e) {
      console.error(
        "[ContentSlider] There was a problem calculating the controls for the content slider: ",
        e
      );
    }
  }

  /**
   * Resizes the content slider's cards to always display a fixed number of cards.
   * @uses this.contentSlider
   */
  resizeCards() {
    const mobileWidthInPx = 640;
    const contentSliderWidth = this.contentSlider.offsetWidth;
    let contentSliderBlock = this.contentSlider.querySelectorAll(
      ".content-slider__block"
    );
    let cardsToShow = 1.25; // show 1.25 cards on mobile
    let cardWidth = 24; //default card width for mobile
    let combinedGuttersInPx = 50;

    //set the desktop values
    if (contentSliderWidth > mobileWidthInPx) {
      cardsToShow = 2.25;
      combinedGuttersInPx = 150;
    }
    // set the individual card width
    cardWidth = (contentSliderWidth - combinedGuttersInPx) / cardsToShow / 10; //convert to rem

    // apply to each card
    contentSliderBlock.forEach((card) => {
      card.style.minWidth = `${cardWidth}rem`;
    });
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
    });

    this.controlsRight.addEventListener("click", (e) => {
      e.preventDefault();
      this.contentSliderCardsList.scrollLeft += this.sliderStep; //px scroll amount
    });

    window.addEventListener("resize", () => {
      this.setControlSurface();
      this.resizeCards();
    });
  }

  /**
   * Inirializes the intersection observer to add left (prev) control on the content slider as soon as the first card starts to go out of the viewport".
   * @uses this.contentSlider
   * @uses this.firstCard
   * @returns {void}
   */
  initializeIntersectionObserver() {
    // Trigger thresholds for the intersection observer to fire the callback
    const thresholdArr = [1, .9999, .999, .99];
    const intersectionRatioToTriggerChange = .995;
    const zIndexToShow = 15;
    const zIndexToHide = 10;

    const options = {
      root: this.contentSlider,
      threshold: thresholdArr,
    };
  
    try {
      let io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // The first card is starting to be out of viewport (99.5% or less of the card is in the viewport)
          if (entry.intersectionRatio < intersectionRatioToTriggerChange) {
            this.controlsLeft.style.zIndex = zIndexToShow;
          } else {
            this.controlsLeft.style.zIndex = zIndexToHide;
          }
        });
      }, options);
      
      io.observe(this.firstCard);
    } catch (e) {
      console.error(
        "[Content Slider] There was a problem initializing the intersection observer: ",
        e
      );
    }
  }

  /**
   * TODO: Implement fx
   * Appends the left and right controls to the content slider.
   * @param {HTMLElement} contentSlider
   * @return {void}
   */
}

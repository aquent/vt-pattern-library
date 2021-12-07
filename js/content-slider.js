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
  constructor(sliderWrapper = '.content-slider', controlSurface = ".content-block__upper") {
    // check if there is a content slider

      console.log("ContentSlider constructor");

        this.contentSlider = document.querySelector(sliderWrapper);
        this.controlSurface = document.querySelector(controlSurface);

    if (this.contentSlider) {
      /**
       * TODO: update selectors to data-attributes
       */
      //get the DOM elements
      const contentSliderCardsList  = this.contentSlider.querySelector(".content-slider__cards-list");
      const contentSliderControls   = this.contentSlider.querySelector(".content-slider__controls");
      const controlSurface          = this.controlSurface;

      const controlsLeft            = contentSliderControls.querySelector(".content-slider__controls-left");
      const controlsRight           = contentSliderControls.querySelector(".content-slider__controls-right");

      //get the DOMRect objects of the emelements to use in positioning calculations
      let controlSurfaceRect        = controlSurface.getBoundingClientRect();
      let contentSliderControlsRect = contentSliderControls.getBoundingClientRect();

      //set height of Left and Right controls
      //height must be set on individual controls as they are empty
      controlsLeft.style.height     = `${controlSurfaceRect.height}px`;
      controlsRight.style.height    = `${controlSurfaceRect.height}px`;

      // console.log("initial controlSurfaceRect.top",controlSurfaceRect.top);
      // console.log("initial contentSliderControlsRect.top", contentSliderControlsRect.top);

      // viewport starts at [0, 79px] ???
      let intitialTopValue = contentSliderControlsRect.top; //79px
      let diff = 0;

      contentSliderControls.style.top = `${controlSurfaceRect.top - intitialTopValue}px`;
      
      // let resizeObserver = new ResizeObserver(entries => {
      //   for (let entry of entries){
      //   //   recalculate the controls rect.
      //     contentSliderControlsRect = contentSliderControls.getBoundingClientRect();

      //     //find the diff between controlRect and upper rect 
      //     diff = controlSurfaceRect.top - contentSliderControlsRect.top;

      //   //  Adjust controls' top - math is incorect
      //     // contentSliderControls.style.top = `${controlSurfaceRect.top - intitialTopValue + diff}px`;
      //   }
      // });
      
      // resizeObserver.observe(this.contentSlider);

      // //event listeners
      // //TODO: Refactor to a single function with behavior based on event.someValue
      controlsLeft.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft -= 500;
        
      })

      controlsRight.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft += 500;
    });

    window.addEventListener("resize", () => {
      this.resizeControlSurface();
    })

    this.testFx();

    } else {
      console.error("[Content Slider] No content slider found");
    }
  } 

  resizeControlSurface() {
    console.log("resizeControlSurface");

    
  }

  testFx() {
    console.log("test");
  }
}

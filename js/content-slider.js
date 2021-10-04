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
  constructor() {
    // check if there is a content slider
        this.contentSlider = document.querySelector('[aria-label="gallery"]');

    if (this.contentSlider) {
      /**
       * TODO: update selectors to data-attributes
       */
      //get the DOM elements
      const contentSliderCardsList  = this.contentSlider.querySelector(".content-slider__cards-list");
      const contentSliderControls   = this.contentSlider.querySelector(".content-slider__controls");
      const contentBlockUpper       = this.contentSlider.querySelector(".content-block__upper");

      const controlsLeft            = contentSliderControls.querySelector(".content-slider__controls-left");
      const controlsRight           = contentSliderControls.querySelector(".content-slider__controls-right");

      //get the DOMRect objects of the emelements to use in positioning calculations
      let contentBlockUpperRect     = contentBlockUpper.getBoundingClientRect();
      let contentSliderControlsRect = contentSliderControls.getBoundingClientRect();

      //set height of Left and Right controls
      //height must be set on individual controls as they are empty
      controlsLeft.style.height     = `${contentBlockUpperRect.height}px`;
      controlsRight.style.height    = `${contentBlockUpperRect.height}px`;

      // console.log("initial contentBlockUpperRect.top",contentBlockUpperRect.top);
      // console.log("initial contentSliderControlsRect.top", contentSliderControlsRect.top);

      // viewport starts at [0, 79px] ???
      let intitialTopValue = contentSliderControlsRect.top; //79px
      let diff = 0;

      contentSliderControls.style.top = `${contentBlockUpperRect.top - intitialTopValue}px`;
      
      let resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries){
        //   recalculate the controls rect.
          contentSliderControlsRect = contentSliderControls.getBoundingClientRect();

          //find the diff between controlRect and upper rect 
          diff = contentBlockUpperRect.top - contentSliderControlsRect.top;

        //  Adjust controls' top - math is incorect
          // contentSliderControls.style.top = `${contentBlockUpperRect.top - intitialTopValue + diff}px`;
        }
      });
      
      resizeObserver.observe(this.contentSlider);

      //event listeners
      controlsLeft.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft -= 500;
        
      })

      controlsRight.addEventListener("click", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft += 500;

        // contentSliderCardsList.scroll({
        //   left: 600, // absolute value. Needs to be dynamically calclucated.
        //   behavior: "smooth"
        // })
      })

      contentSliderControls.addEventListener("wheel", (e) => {
        e.preventDefault();
        contentSliderCardsList.scrollLeft += e.deltaY * 2;
    });
    }
  } 
}

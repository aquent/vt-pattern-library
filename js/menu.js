import scssVars from "!!sass-variable-loader?preserveVariableNames!../scss/util/_variables.scss";

/**
 * Class representing the main menu navigation.
 */
export default class Menu {
  constructor(navbarSelector, generateOverlay = false) {
    this.generateOverlay = generateOverlay;
    this.navbar = document.querySelector(navbarSelector);
    this.navbarId = navbarSelector.replace(".", "#");
    this.menus = this.navbar ? this.navbar.querySelectorAll("details") : null;
    this.navOverlay = document.createElement('div'); 
    this.navOverlay.classList.add('nav-overlay');
    this.navLogo = document.querySelector(".top-nav__logo");
    this.mobileView;
  }

  handleNonMenuClick = (e) => {
    const breakpoint = "(max-width: " + scssVars["breakpointDesktop"] + ")";
    this.mobileView = window.matchMedia(breakpoint);
    // Close openthis.menus if the user clicks on a non-menu item
    if (
      this.navbar &&
      this.navbar !== e.target &&
      !this.navbar.contains(e.target)
    ) {
      this.menus.forEach((thisDetail) => {
        if (thisDetail.open) {
          thisDetail.removeAttribute("open");
        } 
      });  
    }
    // Removes overlay div for main menu dropdowns and prevent overrides for overlay div on mobile
    if (!this.mobileView.matches && this.generateOverlay == true) {
      this.navOverlay.remove();
      document.body.classList.remove("no-scroll");
    }
  };

  handleEscapeKey = (e) => {
    // Close openthis.menus if the esc key is pressed
    if (e.key == "Escape")
      this.menus.forEach((thisDetail) => {
        if (thisDetail.open) thisDetail.removeAttribute("open");
         // Removes overlay div for main menu dropdowns
        if(this.generateOverlay == true) {
          this.navOverlay.remove();
          document.body.classList.remove("no-scroll");
        }
      });
    return;
  };

  asyncDropdown = () => {
    if (this.navbar) {
      // Close an open menu if another menu item is opened
      this.menus.forEach((thisDetail, _, details) => {    
        thisDetail.ontoggle = (_) => {
          if (thisDetail.open) {
            details.forEach((thatDetail) => {
              if (thatDetail != thisDetail) {
                thatDetail.removeAttribute("open"); 
                // Generate overlay div only on main menu dropdowns
                if(this.generateOverlay == true) {
                  this.navLogo.insertAdjacentElement('afterend', this.navOverlay);
                  document.body.classList.add("no-scroll");
                }           
              }           
            });
          }
        };
      });

      document.addEventListener("pointerdown", this.handleNonMenuClick);
      document.addEventListener("keydown", this.handleEscapeKey);
      window.addEventListener("hashchange", this.handleScrollAndOverlay);
    }
  };

  handleScrollAndOverlay = (e) => {
    if (e.newURL.includes(this.navbarId)) {
      document.body.classList.add("no-scroll");
      this.navLogo.insertAdjacentElement('afterend', this.navOverlay);
      return;
    } else {
      document.body.classList.remove("no-scroll");
      this.navOverlay.remove();
      return;
    }
  };
}

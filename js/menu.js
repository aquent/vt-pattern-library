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
    this.navOverlay = document.createElement("div");
    this.navOverlay.classList.add("nav-overlay");
    this.navLogo = document.querySelector(".top-nav__logo");
    this.mobileView;
  }

  #displayDropdownMenu(menuItem, displayStyle) {
    if (menuItem.querySelector(".dropdown-menu"))
      menuItem.querySelector(".dropdown-menu").style.display = displayStyle;
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
          this.#displayDropdownMenu(thisDetail, "none");
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
        if (this.generateOverlay == true) {
          this.navOverlay.remove();
          document.body.classList.remove("no-scroll");
        }
      });
    return;
  };

  handleMobileJumpLink = () => {
    const breakpoint = "(max-width: " + scssVars["breakpointDesktop"] + ")";
    this.mobileView = window.matchMedia(breakpoint);
    if (this.mobileView.matches) {
      const anchors = this.navbar.querySelectorAll("a");

      anchors.forEach((anchor) => {
        anchor.onclick = (e) => {
          e.preventDefault();
          window.location.replace(anchor.getAttribute("href"));
        };
      });
    }
  };

  asyncDropdown = () => {
    if (this.navbar) {
      // Close an open menu if another menu item is opened
      this.menus.forEach((thisDetail, _, details) => {
        thisDetail.ontoggle = (_) => {
          if (thisDetail.open) {
            this.#displayDropdownMenu(thisDetail, "grid");
            details.forEach((thatDetail) => {
              if (thatDetail != thisDetail) {
                thatDetail.removeAttribute("open");
                this.#displayDropdownMenu(thatDetail, "none");

                // Generate overlay div only on main menu dropdowns
                if (this.generateOverlay == true) {
                  this.navLogo.insertAdjacentElement(
                    "afterend",
                    this.navOverlay
                  );
                  document.body.classList.add("no-scroll");
                }
              }
            });
          }
        };
      });

      // mobile - prevent opening menu after going back on page
      this.handleMobileJumpLink();

      document.addEventListener("pointerdown", this.handleNonMenuClick);
      document.addEventListener("keydown", this.handleEscapeKey);
      window.addEventListener("hashchange", this.handleScrollAndOverlay);
    }
  };

  handleScrollAndOverlay = (e) => {
    if (e.newURL.includes(this.navbarId)) {
      document.body.classList.add("no-scroll");
      this.navLogo.insertAdjacentElement("afterend", this.navOverlay);
      return;
    } else {
      document.body.classList.remove("no-scroll");
      if (this.navOverlay) this.navOverlay.remove();
      return;
    }
  };
}

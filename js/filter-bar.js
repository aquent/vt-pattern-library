import Menu from "./menu";
import scssVars from "!!sass-variable-loader?preserveVariableNames!../scss/util/_variables.scss";

/**
 * Class representing the filter bar extending main menu navigation.
 */
export default class FilterBar extends Menu {
  constructor(filterBarSelector) {
    super(filterBarSelector);
    this.mobileView;
  
    this.handleMobileChange();
    window.addEventListener("resize", this.handleMobileChange);
  }

  spreadMenuDropdown = () => {
    if (this.navbar) {
      // open all details on mobile view
      this.menus.forEach((thisDetail) => {
        thisDetail.open = true;
      });
    }
  };

  handleSorterChange = () => {
    document
      .querySelectorAll(".filter-bar__sorter-input-toggle")
      .forEach((e) => {
        e.addEventListener("change", _ => {
          document.getElementsByTagName("form")[0].submit();
        });
      });
  };

  handleMobileChange = () => {
    const breakpoint = "(max-width: " + scssVars["breakpointDesktop"] + ")";
    this.mobileView = window.matchMedia(breakpoint);

    if (this.mobileView.matches) {
      // Stop closing openthis.menus if the user clicks on a non-menu item
      document.removeEventListener("pointerdown", super.handleNonMenuClick);

      // Stop closing openthis.menus if the esc key is pressed
      document.removeEventListener("keydown", super.handleEscapeKey);

      // Open all filter menu on mobile
      this.spreadMenuDropdown(this.navbar, this.menus);
    } else {
      this.menus.forEach((thisDetail) => {
        if (thisDetail.open) thisDetail.removeAttribute("open");
      });
      this.asyncDropdown(this.navbar);
      this.handleSorterChange();
    }
  };
}

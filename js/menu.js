/**
 * Class representing the main menu navigation.
 */
export default class Menu {
  constructor(navbarSelector) {
    this.navbar = document.querySelector(navbarSelector);
    this.menus = this.navbar ? this.navbar.querySelectorAll("details") : null;
  }

  handleNonMenuClick = (e) => {
    // Close openthis.menus if the user clicks on a non-menu item
    if (
      this.navbar &&
      this.navbar !== e.target &&
      !this.navbar.contains(e.target)
    ) {
      this.menus.forEach((thisDetail) => {
        if (thisDetail.open) thisDetail.removeAttribute("open");
      });
    }
  };

  handleEscapeKey = (e) => {
    // Close openthis.menus if the esc key is pressed
    if (e.key == "Escape")
      this.menus.forEach((thisDetail) => {
        if (thisDetail.open) thisDetail.removeAttribute("open");
      });
    return;
  };

  asyncDropdown = () => {
    if (this.navbar) {
      // Close an open menu if another menu item is opened
      this.menus.forEach((thisDetail, _, details) => {
        thisDetail.ontoggle = (_) => {
          if (thisDetail.open)
            details.forEach((thatDetail) => {
              if (thatDetail != thisDetail) thatDetail.removeAttribute("open");
            });
        };
      });

      document.addEventListener("pointerdown", this.handleNonMenuClick);
      document.addEventListener("keydown", this.handleEscapeKey);
    }
  };
}

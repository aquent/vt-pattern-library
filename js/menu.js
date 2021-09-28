/**
 * Class representing the main menu navigation.
 */
export default class Menu {
  constructor() {
    let navbar = document.querySelector(".navbar");

    if (navbar) {
      let menus = navbar.querySelectorAll("details");

      // Close an open menu if another menu item is opened
      menus.forEach((thisDetail, _, details) => {
        thisDetail.ontoggle = (_) => {
          if (thisDetail.open)
            details.forEach((thatDetail) => {
              if (thatDetail != thisDetail) thatDetail.removeAttribute("open");
            });
        };
      });

      // Close open menus if the user clicks on a non-menu item
      document.addEventListener("pointerdown", function (e) {
        if (navbar !== e.target && !navbar.contains(e.target)) {
          menus.forEach((thisDetail) => {
            if (thisDetail.open) thisDetail.removeAttribute("open");
          });
        }
      });

      // Close open menus if the esc key is pressed
      document.addEventListener("keydown", (e) => {
        if (e.key == "Escape")
          menus.forEach((thisDetail) => {
            if (thisDetail.open) thisDetail.removeAttribute("open");
          });
        return;
      });
    }
  }
}

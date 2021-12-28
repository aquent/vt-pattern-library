/**
 * Class representing the main menu navigation.
 */
export default class Menu {
  constructor(navbarSelector) {
    this.navbar = document.querySelector(navbarSelector);
    this.menus = this.navbar ? this.navbar.querySelectorAll("details") : null;

    this.menuToggle = this.navbar.nextElementSibling; // The mobile menu toggle button
    this.documentBody = document.querySelector("body"); // The document body


    
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
      this.menuToggle.addEventListener("pointerdown", this.handleScrollAndOverlay);
    }
  };

  handleScrollAndOverlay = (e) => {
    // need the body
    this.documentBody.classList.toggle("no-scroll");
    // need the dropdown menu
    this.navbar.classList.toggle("scroll)");
    //need the overlay



    // document.body.classList.toggle("no-scroll");
    // document.querySelector(".navbar").classList.toggle("scroll");
    // let dropDownMenu = document.querySelector(".dropdown-menu");
    // console.log(dropDownMenu)
    // dropDownMenu.classList.toggle("scroll");
  }
}


// Notes: Can be an onclick / onpointerdown event handler or use the hashchange event handler. The latter is seems to be more efficient and reliable.

// window.addEventListener('hashchange', function(e){
//   console.log(e.newURL);
  
//   if (e.newURL.includes("navbar")) {
//     addClass(body, "backdrop");
//   } else {
//     removeClass(body, "backdrop");
//     // addClass(navbar, "navbar-open");
//   }
//   })
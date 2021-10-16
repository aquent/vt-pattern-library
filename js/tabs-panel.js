/**
 * Tabs Panel
 * @param {String} navbarContainer
 * @param {string} tabsContainer
 *
 */
export default class TabsPanel {
  constructor(navbarContainer, tabsContainer) {
    this.tabsContainer = document.querySelector(tabsContainer);
    this.navbarContainer = document.querySelector(navbarContainer);

    // If there is a navbarContainer and a tabsContainer continue initializing the constructor
    if (this.tabsContainer && this.navbarContainer) {
      // the first child of navbarContainer is the mobile dropdown, the second ins the desktop nav
      this.dropdownMobile = this.navbarContainer.children[0];
      this.navDesktop = this.navbarContainer.children[1];

      // Get the array of all tabs
      this.menuItems = this.navDesktop.children;
      this.dropdownItems = this.dropdownMobile.children;
      this.tabs = this.tabsContainer.children;

      // Attach event listeners to the desktop navigation bar and the mobile dropdown
      this.navDesktop.addEventListener("click", this.onClick, false);
      this.dropdownMobile.addEventListener("change", this.onChange, false);

      this.currentItem = 0;
      this.prevItem = 0;
      this.updateDropdown(3)
    }
  }
  // onClick for navbar
  onClick = (e) => {
    // Due to the 
    const clickedItem =
      e.target.nodeName === "A" 
        ? e.target.parentElement 
        : e.target;

    console.log("clickedItem", clickedItem);
    const clickedItemNumber = clickedItem.dataset.panelId;

    this.updateDropdown(clickedItemNumber);
    this.updateNav(clickedItemNumber);

    this.prevItem = this.currentItem;
    this.currentItem = clickedItemNumber;
  };

  // onChange for me mobile dropdown
  onChange = (e) => {
    const changedItem = e.target.selectedIndex;
    // console.log("selected index", this.dropdownMobile.selectedIndex)

    this.updateDropdown(changedItem);
    this.updateNav(changedItem);

    this.prevItem = this.currentItem;
    this.currentItem = changedItem;
    // this.updateNav()
  };

  updateNav = (newMenuItem) => {
    this.menuItems[this.currentItem].classList.remove("open");
    this.menuItems[newMenuItem].classList.add("open");
    this.currentItem = newMenuItem;
  };

  updateDropdown = (newOptionIndex) => {
    this.dropdownMobile.options[newOptionIndex].selected = true
    // console.log("here", newOptionIndex);
    // this.dropdownMobile.options
    // console.log();
  };

  updatePanels = (panelNum) => {};

  /**
   * Takes in an id containing a number (panel-3) and returns the number
   * @param {String} str
   * @returns {String}
   */
  getNumericValue = (str) => {
    return str.replace(/[^0-9]/g, "");
  };
}

/**
 * Tabs Panel
 * @param {String} navbarContainer
 * @param {string} tabsContainer
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
    }
  }
  // onClick for navbar
  onClick = (e) => {
    // The reason for the ternary check is there is only one click event attached to the navbar. A side effect of that is the use can click on either the <a> or a <li>. I believe having this check is more efficicent than having multiple event listeners.
    const clickedItem =
      e.target.nodeName === "A" ? e.target.parentElement : e.target;

    const clickedItemNumber = clickedItem.dataset.panelId;

    this.updateDropdown(clickedItemNumber);
    this.updateNav(clickedItemNumber);

    this.updatePanel(clickedItemNumber);

    this.currentItem = clickedItemNumber;
  };

  // onChange for me mobile dropdown
  onChange = (e) => {
    const changedItem = e.target.selectedIndex;

    this.updateDropdown(changedItem);
    this.updateNav(changedItem);
    this.updatePanel(changedItem);

    this.currentItem = changedItem;
  };

  updateNav = (newMenuItem) => {
    this.menuItems[this.currentItem].classList.remove("open");
    this.menuItems[newMenuItem].classList.add("open");
  };

  updateDropdown = (newOptionIndex) => {
    this.dropdownMobile.options[newOptionIndex].selected = true;
  };

  updatePanel = (panelNum) => {
    let prevTab = this.tabs[this.currentItem];
    let currentTab = this.tabs[panelNum];
    console.log(prevTab);
    prevTab.classList.remove("open");
    currentTab.classList.add("open");
  };
}

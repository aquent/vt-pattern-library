export default class TabsPanel {
  constructor(tabsPanel){
    if (tabsPanel) {
      this.tabsPanel = tabsPanel;
      
      const tabPannels = this.tabsPanel.querySelectorAll(".tabs-panel__ul__li")
      const tabSelect = this.tabsPanel.querySelectorAll(".tabs-panel__ul__li")
      console.log(panels)
      tabsPanel.addEventListener("click", this.onClick);
    }


  }

  onClick(){
    console.log("clicked");
    console.log(this.panels)
  }


}
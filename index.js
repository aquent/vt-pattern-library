import "./scss/styles.scss";
import Menu from "menu";
import ContentSlider from "content-slider";
import VideoController from "video-controller";
import TabsPanel from "tabs-panel";
import FilterBar from "filter-bar";

function init() {

  const menu = new Menu(".navbar");

  let contentSliders = {};
  let contentSliderNodes = document.querySelectorAll(".content-slider");
  contentSliderNodes.forEach((val, i) => {
    contentSliders[i] = new ContentSlider(val);
  });

  const tabsPanel = new TabsPanel(
    ".tabs-nav",
    ".tabs"
  );

  const videoController = new VideoController(
    ".hero-video__controller-wrapper",
    ".hero-video__controller"
  );

  if (document.querySelector(".filter-bar__menu")) {
    const filterBar = new FilterBar(".filter-bar__menu");
  }

  menu.asyncDropdown();

}

window.addEventListener("DOMContentLoaded", init);
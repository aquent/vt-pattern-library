import "./scss/styles.scss";
import Menu from "menu";
import ContenSlider from "content-slider";
import VideoController from "video-controller";
import TabsPanel from "./js/tabs-panel";
import FilterBar from "filter-bar";

function run () {
  const menu = new Menu(".navbar");
  const contentSlider = new ContenSlider(".content-slider", ".content-block__upper");
  const tabsPanel = new TabsPanel(".tabs-nav", ".tabs");
  const videoController = new VideoController(
    ".hero-video__controller-wrapper",
    ".hero-video__controller"
  );
  
  if (document.querySelector(".filter-bar__menu")) {
    const filterBar = new FilterBar(".filter-bar__menu");
    filterBar.controlMenuDropdown();
  }
  menu.asyncDropdown();
}







// const run = () => {
//   // const width = window.innerWidth;
//   // const height = window.innerHeight;
// const contentSlider = new ContenSlider(".content-slider", ".content-block__upper");

  // const chartNode = document.querySelector("main");
  // drawChart.default(chartNode, data, width, height);
// };

// window.addEventListener('resize', run);

document.addEventListener('DOMContentLoaded', run);
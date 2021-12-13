import "./scss/styles.scss";
import Menu from "menu";
import ContenSlider from "content-slider";
import VideoController from "video-controller";
import TabsPanel from "./js/tabs-panel";
import FilterBar from "filter-bar";
import { salarySurveyInit } from 'compare-salary';

const menu = new Menu(".navbar");
const contentSlider = new ContenSlider();
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

// Initialize Compare Salary
salarySurveyInit();
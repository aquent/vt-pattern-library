import "./scss/styles.scss";
import Menu from "menu";
import ContenSlider from "content-slider";
import VideoController from "video-controller";
import TabsPanel from "./js/tabs-panel";

const menu = new Menu();
const contentSlider = new ContenSlider();
const tabsPanel = new TabsPanel(
  ".tabs-nav", 
  ".tabs"
);
const videoController = new VideoController(
  ".hero-video__controller-wrapper",
  ".hero-video__controller"
);

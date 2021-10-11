import "./scss/styles.scss";
import Menu from "menu";
import ContenSlider from "content-slider";
import VideoController from "video-controller";

const menu = new Menu();
const contentSlider = new ContenSlider();
const tabsPanel = new TabsPanel(document.querySelector(".tabs-panel"));
const videoController = new VideoController(
  ".hero-video__controller-wrapper",
  ".hero-video__controller"
);

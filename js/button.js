
export default class ButtonUrlParamDetector {
  constructor(button){ 
    button.addEventListener("click", this.handleClick);
  }

  handleClick(e){
    let utmParams = [];

    // const urlStr = window.location.href;
    const urlStr = "https://vitamintalent.com/reports?param1=value1&param2=value2"

    let buttonHrefStr = e.target.href;

    // check if the url has utm params
    if (urlStr.indexOf("?") > -1) {
      // get the utm params from the current URL and add them to an array
      utmParams = urlStr.split("?")[1].split("&");
    }

    // If there have been utm params, add them to the button's href
    if (utmParams.length > 0) {
      buttonHrefStr += "?";
      utmParams.forEach((param) => {
          buttonHrefStr += "&" + param;
     });

      e.target.href = buttonHrefStr;
    }

    console.log('Button Href= ',buttonHrefStr)
    console.log('Current Url= ',urlStr)
    console.log(e.target.href)
  }
}
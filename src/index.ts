import Application from "./lib/index";

(window => {
  const oApp = document.getElementById("app")!;
  const application = new Application(oApp);
})(window)!;

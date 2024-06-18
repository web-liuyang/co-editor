import Application from "./lib/application";

(window => {
  const oApp = document.getElementById("app")!;
  const application = new Application(oApp);
})(window)!;

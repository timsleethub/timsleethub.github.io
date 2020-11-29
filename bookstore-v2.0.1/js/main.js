import centralEvents from "./centralEvents.js";
import { addToCart, selectGenre, getState } from "./model.js"
import startUI from "./UI.js";

function startUI_Internal() {
  startUI(getState());
}


function makeLogger(prefix) {
  return function (evt) {
    console.log(prefix, evt);
  }
}


function init() {
  startUI_Internal();

  // model events
  centralEvents.addEventListener("stateChange", startUI_Internal)

  // UI events
  centralEvents.addEventListener("genreSelected", selectGenre);
  centralEvents.addEventListener("bookSelected", addToCart);
  centralEvents.addEventListener("bookSelected", makeLogger("bookSelected"))
}


init();

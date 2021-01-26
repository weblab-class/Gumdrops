/**
 * Utility functions to make API requests.
 * By importing this file, you can use the provided get and post functions.
 * You shouldn't need to modify this file, but if you want to learn more
 * about how these functions work, google search "Fetch API"
 *
 * These functions return promises, which means you should use ".then" on them.
 * e.g. get('/api/foo', { bar: 0 }).then(res => console.log(res))
 */

import brush from "./public/brush.jpg";
import gift from "./public/gift.gif";
import penguin from "./public/penguin-bounce.gif";
import gloveCursor from "./public/gloveCursor.png";

// ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}

//Helper code to convert an file (either from fs.ReadFileSync or file submission) to a react Buffer object.
//The intermediate step of converting to Base64 is not necessary, but is included anyways.
export function fileToBuffer(data) {
  let base64 = data.toString('base64');
  let bufferedObj = Buffer.from(base64,'base64');
  return bufferedObj;
}

//If it exists, load the theme data from HTML Local Storage and applies it to the root CSS
export function applyThemeFromLocalStorage() {
  if(localStorage.hasOwnProperty("currTheme")) {
      let themeObj = JSON.parse(localStorage.getItem("currTheme"));
      for (const [key, value] of Object.entries(themeObj)) {
          //console.log(`${key}: ${value}`);
          document.documentElement.style.setProperty(key, value);
        }
  } else {
      //do nothing
  }
}

//Overrides the current theme data (if any) in LocalStorage
//Note: This does not change the actual CSS settings being applied.
export function loadDefaultTheme() {
  //default theme is from :root in utilities.css
  //focuses on settings that I actually change in rewards
  let defaultTheme = {
      "--primary": "rgb(230, 94, 90)",
      "--primary--dim": "rgb(247, 161, 162)",
      "--textcolor": "black",
      "--subtextcolor": "gray",
      "--main-background": "var(--grey)",
      "--navbar-container": "lightpink",
      "--navbar-bottom-border": "rgb(224, 145, 171)",
      "--cursor-image": "default",
      "--cursor-pointer": "url("+gloveCursor+")",
      "--mode":"light",
      "--projectpage-background": "var(--main-background)",
  };
  localStorage.setItem("currTheme",JSON.stringify(defaultTheme));
}

//The following 3 functions are responsible for pushing the corresponding rewards in Rewards page
function pushDarkMode() {
  let darkObj = {
      "--navbar-container":"#2C2F33",
      "--navbar-bottom-border":"#23272A",
      "--textcolor":"rgba(255,255,255,0.8)",
      "--main-background":"#2C2F33",
      "--primary":"#53585f",
      "--primary--dim":"#3b3f44",
      "--mode":"dark",
  }
  localStorage.setItem("currTheme",JSON.stringify(darkObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}

function undoDarkMode() {
  let darkObj = {
      "--navbar-container": "lightpink",
      "--navbar-bottom-border": "rgb(224, 145, 171)",
      "--textcolor": "black",
      "--main-background": "var(--grey)",
      "--primary": "rgb(230, 94, 90)",
      "--primary--dim": "rgb(247, 161, 162)",
      "--mode":"light",
  }
  localStorage.setItem("currTheme",JSON.stringify(darkObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}

function pushPenguinCursor() {
  let penguinObj = {
      "--cursor-image":"url("+gift+")",
      "--cursor-pointer":"url("+penguin+")",
  }
  localStorage.setItem("currTheme",JSON.stringify(penguinObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}

function undoPenguinCursor() {
  let penguinObj = {
    "--cursor-image": "default",
    "--cursor-pointer": "url("+gloveCursor+")",
  }
  localStorage.setItem("currTheme",JSON.stringify(penguinObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}


function pushBrushTheme() {
  let brushObj = {
      "--projectpage-background": "linear-gradient( rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.55)), url("+brush+")",
  }
  localStorage.setItem("currTheme",JSON.stringify(brushObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}

function undoBrushTheme() {
  let brushObj = {
      "--projectpage-background": "var(--main-background)",
  }
  localStorage.setItem("currTheme",JSON.stringify(brushObj)); //required to save objects in LocalStorage
  applyThemeFromLocalStorage();
}



//Handles the enforcing and disabling of an unlockable upon click
export function handleUnlock(unlockName) { 
  console.log("Handle unlock for "+unlockName)
  if(!localStorage.hasOwnProperty(unlockName) || localStorage.getItem(unlockName)==="off"){ //current state is off
    switch(unlockName) {
      case "Brush Background":
        console.log("Reached on brush");
        pushBrushTheme();
        break;
      case "Dark Mode":
        console.log("Reached on dark");
        pushDarkMode();
        break;
      case "Surprise Penguin":
        console.log("Reached on penguin");
        pushPenguinCursor();
        break;
    }
    localStorage.setItem(unlockName,"on");
  } else { //current state is on
    switch(unlockName) {
      case "Brush Background":
        console.log("Reached off brush");
        undoBrushTheme();
        break;
      case "Dark Mode":
        console.log("Reached off dark");
        undoDarkMode();
        break;
      case "Surprise Penguin":
        console.log("Reached off penguin");
        undoPenguinCursor();
        break;
    }
    localStorage.setItem(unlockName,"off");
  }
}
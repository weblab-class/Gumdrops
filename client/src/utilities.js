/**
 * Utility functions to make API requests.
 * By importing this file, you can use the provided get and post functions.
 * You shouldn't need to modify this file, but if you want to learn more
 * about how these functions work, google search "Fetch API"
 *
 * These functions return promises, which means you should use ".then" on them.
 * e.g. get('/api/foo', { bar: 0 }).then(res => console.log(res))
 */

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
  console.log("Applying default");
  //default theme is from :root in utilities.css
  let defaultTheme = {
      "--primary": "rgb(230, 94, 90)",
      "--primary--dim": "rgb(247, 161, 162)",
      "--darkgrey": "rgb(0, 0, 0)",
      "--medgrey": "rgb(222, 221, 213)",
      "--grey": "rgb(240, 242, 236)",
      "--darkergrey": "lightgrey",
      "--white": "#fff",
      "--aqua": "rgb(1, 182, 216)",
      "--green": "rgb(105, 182, 73)",
      "--yellow": "rgb(252, 242, 134)",
      "--textcolor": "black",
      "--subtextcolor": "gray",
  };
  localStorage.setItem("currTheme",JSON.stringify(defaultTheme));
}


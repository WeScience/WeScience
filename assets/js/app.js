// Importing jQuery in ES6 style
import $ from "jquery";

// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
require('bootstrap-sass'); //x
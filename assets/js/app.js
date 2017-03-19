'use strict';

// Importing jQuery in ES6 style
import $ from "jquery";
import dashboard from './pages/dashboard.js';
import home from './pages/home.js';
import profile from './pages/profile.js';
import commits from './pages/commits.js';

// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
require('bootstrap-sass');

if ($('.dashboard-page').length) dashboard().init();
if ($('.home-page').length) home().init();
if ($('.profile-page').length) profile().init();
if ($('.js-project-commits-page').length) commits().init();

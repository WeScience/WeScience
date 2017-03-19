'use strict';

// Importing jQuery in ES6 style
import $ from "jquery";
import dashboard from './pages/dashboard';
import home from './pages/home';
import profile from './pages/profile';
import commits from './pages/commits';
import mainNav from './pages/mainNav';
import project from './pages/project';
import event from './pages/event';
import login from './components/login';
import menu from './components/menu';
import fork from './pages/fork';


// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
require('bootstrap-sass');
mainNav().init();
login().init();
menu().init();

fork().init();
fork().forked();

if ($('.dashboard-page').length) dashboard().init();
if ($('.home-page').length) home().init();
if ($('.profile-page').length) profile().init();
if ($('.js-project-commits-page').length) commits().init();
if ($('.js-project-page').length) project.init();
if ($('.js-event-page').length) event.init();

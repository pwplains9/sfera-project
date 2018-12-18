/**
 * Created by Abaddon on 06.02.2017.
 *  Application entry point
 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "isMobile" }] */
import 'normalize.css';
import jQuery from 'jquery';
import isMobile from './vendors/isMobile';
import App from './App';
import '../css/style.less';
import './vendors/migrate';

global.$ = jQuery;
global.jQuery = jQuery;
global.isMobile = isMobile;
// Ie fix
global.Promise = require('es6-promise').Promise;
$(document).ready(App.start());

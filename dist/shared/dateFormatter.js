'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = undefined;

var _locales = require('./locales');

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

// eslint-disable-next-line import/prefer-default-export
var formatTime = exports.formatTime = function formatTime(date) {
  return getFormatter({ hour: 'numeric', minute: 'numeric', second: 'numeric' })(date);
};
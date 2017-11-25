/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).ready(function () {
  var _this = this;

  var numberOfCards = 20;
  var boardOfCards = [];
  var activeCards = [];
  var canClick = true;
  var failedTries = 0;
  var correctPairs = 0;
  var cardsImages = ['boston.png', 'chicago.png', 'cleveland.png', 'houston.png', 'la_lakers.png', 'miami.png', 'nba.png', 'oklahoma.png', 'san_antonio.png', 'warriors.png', 'washington.png'];

  startGame = function startGame() {
    boardOfCards = [];
    activeCards = [];
    canClick = true;
    failedTries = 0;
    correctPairs = 0;

    var gameBoard = $('#gameBoard').empty(); // clean game board

    // put card number into array
    for (var i = 0; i < numberOfCards; i++) {
      boardOfCards.push(Math.floor(i / 2));
    }

    console.log(boardOfCards);

    // shuffle cards numbers
    for (var _i = numberOfCards - 1; _i > 0; _i--) {
      var swap = Math.floor(Math.random() * _i);
      var temp = boardOfCards[_i];
      boardOfCards[_i] = boardOfCards[swap];
      boardOfCards[swap] = temp;
    }

    console.log(boardOfCards);

    // create cards and put into game board
    for (var _i2 = 0; _i2 < numberOfCards; _i2++) {
      var card = $('<div>');
      card.addClass('card');
      card.addClass('card-type-' + boardOfCards[_i2]);
      card.attr('data-cardType', boardOfCards[_i2]);
      card.attr('data-index', _i2);

      _this.gameBoard.append(card);
    }
  };
});

/***/ })
/******/ ]);
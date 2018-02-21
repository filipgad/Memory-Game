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
    var tries = 0;
    var correctPairs = 0;

    // function to start game
    var startGame = function startGame() {
        boardOfCards = [];
        activeCards = [];
        canClick = true;
        tries = 0;
        correctPairs = 0;

        var gameBoard = $('#gameBoard').empty(); // clean game board
        scoreInfo(tries);

        // put card number into array
        for (var i = 0; i < numberOfCards; i++) {
            boardOfCards.push(Math.floor(i / 2));
        }

        // shuffle cards numbers
        boardOfCards.forEach(function (elem, index) {
            var swap = Math.floor(Math.random() * index);
            var temp = boardOfCards[index];
            boardOfCards[index] = boardOfCards[swap];
            boardOfCards[swap] = temp;
        });

        // create cards and put into game board
        boardOfCards.forEach(function (elem, index) {
            var cardBox = $('<div>').addClass('cardBox');
            var card = $('<div>');
            card.addClass('card card-type-' + elem);
            card.attr('data-card-type', elem);
            card.attr('data-index', index);

            cardBox.append(card);
            gameBoard.append(cardBox);
        });

        // event on clicked card
        $('.card').on('click', function () {
            clickedCard($(this));
        });
    };

    // compare clicked cards
    var clickedCard = function clickedCard(card) {
        if (canClick) {

            if (!activeCards[0] || activeCards[0].data('index') != card.data('index')) {
                activeCards.push(card);
                card.css('transform', 'rotateY(360deg)').toggleClass('back');
            }

            if (activeCards.length === 2) {
                canClick = false;
                if (activeCards[0].data('card-type') == activeCards[1].data('card-type')) {
                    setTimeout(function () {
                        deleteCorrectPair(activeCards[0], activeCards[1]);
                    }, 1000);
                } else {
                    setTimeout(function () {
                        resetCards(activeCards[0], activeCards[1]);
                    }, 1000);
                }
            }
        }
    };

    // remove correct pair
    var deleteCorrectPair = function deleteCorrectPair(card1, card2) {
        card1.fadeOut(function () {
            $(_this).remove();
        });
        card2.fadeOut(function () {
            $(_this).remove();
        });

        correctPairs++;
        if (correctPairs >= numberOfCards / 2) {
            tries++;
            gameOver(tries);
        } else {
            activeCards = new Array();
            canClick = true;
            tries++;
            scoreInfo(tries);
        }
    };

    // reset wrong pair
    var resetCards = function resetCards(card1, card2) {
        card1.css('transform', 'none').toggleClass('back');
        card2.css('transform', 'none').toggleClass('back');

        activeCards = new Array();
        canClick = true;
        tries++;
        scoreInfo(tries);
    };

    // score information
    var scoreInfo = function scoreInfo(tries) {
        var score = $('.score').text('Score: ' + tries);
    };

    // game over, score
    var gameOver = function gameOver(tries) {
        $('.slide-score').addClass('show');
        $('.slide-game').removeClass('show');
        $('#gameScore span').text(tries);
    };

    // buttons event - start/restart/new game
    $('.button').on('click', function () {
        $(this).parent().removeClass('show');
        $('.slide-game').addClass('show');
        startGame();
    });

    // $('.smallBoard').on('click', function() {
    //     $('.slide-game').addClass('show');
    //     $(this).parent().parent().removeClass('show');
    // });
});

/***/ })
/******/ ]);
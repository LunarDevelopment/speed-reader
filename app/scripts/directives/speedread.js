'use strict';

/**
 * @ngdoc directive
 * @name speederApp.directive:speedRead
 * @description
 * # speedRead
 */
angular.module('speederApp')
  .directive('speedRead', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@',
        readThis: '=',
        wpm: '=',
        interval: '=',
        paused: '=',
        testing: '='
      },
      controller: function ($scope, $element, $interval, $timeout) {
        var scope = $scope;
        scope.wpm = 120;
        scope.spritzWord = 'test';
        scope.words = [];
        var interval = scope.interval / scope.wpm;
        var paused = scope.paused;
        scope.i = 1;


        /* TEXT PARSING */
        scope.words_set = function () {
          console.log('words_set');
          scope.words = scope.readThis.trim()
            .replace(/([-—])(\w)/g, '$1 $2')
            .replace(/[\r\n]/g, ' {linebreak} ')
            .replace(/\. /g, '. {period} ')
            .replace(/[ \t]{2,}/g, ' ')
            .split(' ');
          for (var j = 1; j < scope.words.length; j++) {
            scope.words[j] = scope.words[j].replace(/{linebreak}|{period}/g, '   ');
          }
        };
        /* ON EACH WORD */
        scope.word_show = function (i) {
          console.log('word_show');
          var word = scope.words[i];
          var stop = Math.round((word.length + 1) * 0.4) - 1;
          scope.spritzWord = '<div>' + word.slice(0, stop) + '</div><div class="highlighted">' + word[stop] + '</div><div>' + word.slice(stop + 1) + '</div>';
        };
        /* ITERATION FUNCTION */
        scope.word_update = function () {
          console.log('word_update');
          scope.spritz = $interval(function () {
            scope.word_show(scope.i);
            scope.i++;
            if (scope.i === scope.words.length) {
              $timeout(function () {
                scope.spritzWord = '';
                scope.spritz_pause();
              }, interval);
              $interval.cancel(scope.spritz);
            }
          }, interval);
        };

        /* PAUSING FUNCTIONS */
        scope.spritz_pause = function () {
          console.log('spritz_pause');
          $interval.cancel(scope.spritz);
          paused = true;
        };
        scope.spritz_play = function () {
          console.log('spritz_play');
          scope.word_update();
          paused = false;
        };
        scope.spritz_flip = function () {
          console.log('spritz_flip');
          if (paused) {
            scope.spritz_play();
          } else {
            scope.spritz_pause();
          }
        };

        /* INITIATE */


        /**
         *
         * on-change="changeWpm();"
         *
         */
        scope.changeWpm = function () {
          console.log('changeWpm');
          interval = scope.interval / scope.wpm;
          if (!paused) {
            $interval.cancel(scope.spritz);
            scope.word_update();
          }
        };

        /* REFRESH TEXT */
        scope.spritzChange = function () {
          console.log('spritzChange');
          $interval.cancel(scope.spritz);
          scope.words_set();
          scope.i = 0;
          scope.spritz_play();
        };

        /* PAUSE BUTTON AND SPACE BAR */
        scope.spritzPause = function () {
          console.log('spritzPause');
          scope.spritz_flip();
          return false;
        };

        /* LIGHT/DARK THEME 
        $('.light').on('click', function () {
          $('html').toggleClass('night');
          return false;
        });
        */

      },
      templateUrl: 'views/speed-read.html'
    };
  });
'use strict';

/**
 * @ngdoc function
 * @name speederApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the speederApp
 */
angular.module('speederApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.testing = 'GEOLOGY ROCKS';
    this.wpm = 60;
    this.interval = 60000;
    this.paused = false;
    this.readThis = 'linked in the info. This is a jQuery implementation of Spritz technology. Paste some text below to try it out. Change the speed and test your comprehension abilities, and click the pause button or space bar if you get a bit overwhelmed! Reading is inherently time consuming because your eyes have to move from word to word and line to line. Traditional reading also consumes huge amounts of physical space on a page or screen, which limits reading effectiveness on small displays. Scrolling, pinching, and resizing a reading area doesn’t fix the problem and only frustrates people. Now, with compact text streaming from Spritz, content can be streamed one word at a time, without forcing your eyes to spend time moving around the page. Spritz makes streaming your content easy and more comfortable, especially on small displays. Our “Redicle” technology enhances readability even more by using horizontal lines and hash marks to direct your eyes to the red letter in each word, so you can focus on the content that interests you. Best of all, Spritz’s patent-pending technology can integrate into photos, maps, videos, and websites to promote more effective communication.';
  });
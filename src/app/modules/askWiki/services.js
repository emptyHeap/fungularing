import wikiGrubber from './services/wikiGrubber.js'

angular.module('wikiServices', []).
  factory('wikiGrubber', wikiGrubber.wikiGrubberFactory )

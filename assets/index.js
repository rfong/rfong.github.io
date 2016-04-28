var app = angular.module('App', []);

// Underscore templating --> Mustache style
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


// Set default value at hash[key] if it does not exist.
var setDefault = function(hash, key, defaultValue) {
  hash[key] = _.isUndefined(hash[key]) ? defaultValue : hash[key];
};

var callOnEnter = function(callback, e) {
  if (e.keyCode === 13) {
    callback();
  }
};


app.controller('Ctrl', function($scope, $http) {
  $scope.groups = [

    {
      title: 'fun afternoon hacks',
      items: [
        { 
          title: 'Pun Assistinator',
          subtitle: 'Phonetically similar word lookup',
          url: 'http://rfong.github.io/pun',
          image: 'images/pun.png',
        },
        { 
          title: 'Replacerator',
          subtitle: 'Chrome extension to define custom browser text replacement rules',
          url: 'https://chrome.google.com/webstore/detail/replacerator/gaajhenbcclienfnniphiiambbbninnp',
          image: 'images/replacerator.png',
        },
        {
          title: 'Plant Toxicity Lookup',
          subtitle: 'Super simple pet toxicity lookup for houseplants, based on ASPCA data',
          url: 'https://rfong.github.io/plant-toxicity/',
          image: 'images/plant-toxicity.png',
        },
        {
          title: 'resonant-hues',
          subtitle: 'Fast website palette tester generated from minimal json',
          url: 'http://rfong.github.io/resonanthues/',
          image: 'images/resonanthues.png',
        },
        {
          title: 'Madlib Maker',
          subtitle: 'Simple, shareable madlib interface',
          url: 'http://madlib.herokuapp.com/',
          image: 'images/madlib.png',
        },
        {
          title: 'Sexy Voice Soundboard',
          subtitle: "The world's finest voices in one convenient soundboard",
          url: 'http://www.sexyvoicesoundboard.com/',
          image: 'images/svs.png',
        },
        {
          title: 'Why We Love You',
          subtitle: 'Sentimental Feltron-inspired website for friends with the bad kind of blues.',
          url: 'http://whyweloveyou.com/',
          image: 'images/wwly.png',
        },
        {
          title: 'Santoku',
          subtitle: 'Embeddable recipe widget that arbitrarily scales and converts between units',
          url: 'http://santoku.herokuapp.com/',
          image: 'images/santoku.png',
        },
        {
          title: 'Snailman',
          subtitle: 'Chrome extension to centralize package tracking',
          url: 'https://chrome.google.com/webstore/detail/snailman/gnncgbnoacieamgkmommabmpchlfidca',
        },
      ],
    },

    {
      title: 'arts',
      items: [
        {
          title: 'Daft Funk',
          subtitle: 'Daft Punk inspired LED visor',
          url: 'http://rflog.tumblr.com/post/133842382406',
          image: 'images/daftpunk.jpg',
        },
        {
          title: 'Qoyuvon',
          subtitle: 'Skyrim dragon priest mask',
          url: 'http://rflog.tumblr.com/post/103921194046',
          image: 'images/skyrim.jpg',
        },
        {
          title: 'Skollmask',
          subtitle: 'sabertooth tiger skull mask',
          url: 'http://rflog.tumblr.com/post/62279392814',
          image: 'images/skollmask.jpg',
        },
        {
          title: 'The Euphoria of Golf',
          subtitle: 'homononerotic sports satire calendar, 2015 edition',
          url: 'http://www.zazzle.com/the_euphoria_of_golf-158502025422375595',
          image: 'images/calendar3.jpg',
        },
        {
          title: 'The Spirit of Football',
          subtitle: 'homononerotic sports satire calendar, 2014 edition',
          url: 'http://www.zazzle.com/the_spirit_of_football_calendar-158847982790357840',
          image: 'images/calendar2.jpg',
        },
        {
          title: 'The Art of Tennis',
          subtitle: 'homononerotic sports satire calendar, 2013 edition',
          url: 'http://www.zazzle.com/the_art_of_tennis_calendar-158761540728115422',
          image: 'images/calendar1.jpg',
        },
      ],
    },

  ];

});


// item-title
app.directive('itemTitle', function() {
  return {
    restrict: 'E',
    scope: {
      url: '=',
      title: '=',
    },
    template: ('' +
      '<div ng-if="title" class="title">' +
      '  <a ng-if="url" href="{{ url }}">{{ title }}</a>' +
      '  <span ng-if="!url">{{ title }}</span>' +
      '</div>'
    ),
  };
});

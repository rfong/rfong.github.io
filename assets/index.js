var app = angular.module('myApp', ['ngSanitize']);

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


app.controller('myCtrl', function($scope, $http, $sce) {

  $scope.init = function() {
    $(document).ready(function() {  // superjank
      $('.page').addClass('hidden');
      var pageId = window.location.hash.replace('#', '');
      if (pageId) {
        $scope.loadPage(pageId);
      } else {
        $scope.loadPage('index');
      }
    });

    // User moved in history
    window.onpopstate = function(event) {
      $scope.loadPage(event.state.pageId);
    };
  };

  $scope.loadPage = function(pageId) {
    window.history.pushState({pageId: pageId}, "rfong/" + pageId, pageId ? '#' + pageId : '');
    if (pageId === '') { pageId = 'index'; }
    $('.page').addClass('hidden');
    $('.page[data-page-id=' + pageId + ']').removeClass('hidden');
    $('#sidebar a.link').removeClass('selected');
    $('#sidebar a.link[data-page-id=' + pageId + ']').addClass('selected');
  };

  $scope.photosets = {
    'firespinning': [
      'images/fire/may5.jpg',
      'images/fire/may4.jpg',
      'images/fire/may3.jpg',
      'images/fire/may2.jpg',
      'images/fire/may1.jpg',
      'images/fire/apr2.jpg',
      'images/fire/apr1.jpg',
      'images/fire/mar2.jpg',
      'images/fire/mar1.jpg',
      'images/fire/feb7.jpg',
      'images/fire/feb6.jpg',
      'images/fire/feb5.jpg',
      'images/fire/feb4.jpg',
      'images/fire/feb3.jpg',
      'images/fire/feb2.jpg',
      'images/fire/feb1.jpg',
      'images/fire/steven.jpg',
    ],
    'places': [
      'images/places/baja_king_cactus.jpg',
      'images/places/baja_totem.jpg',
      'images/places/nevada_fork.jpg',
      'images/places/bernal_layers.jpg',
      'images/places/bman_gate.jpg',
      'images/places/bm_lanterns.jpg',
      'images/places/bm_waypoint.jpg',
      'images/places/rome_hooves.jpg',
      'images/places/cannes_flight.jpg',
    ],
    'textile': [
      {
        src: 'images/art/tinyvest.jpg',
        link: 'http://rflog.tumblr.com/post/144545703661',
        caption: 'leather tinyvest',
      },
      {
        src: 'images/art/gauntlet.jpg',
        link: 'http://rflog.tumblr.com/post/141355716521',
        caption: 'leather gauntlet',
      },
      {
        src: 'images/art/manta.gif',
        link: 'http://rflog.tumblr.com/post/140791098266',
        caption: 'plush nested manta ray',
      },
      {
        src: 'images/art/heart.jpg',
        link: 'http://rflog.tumblr.com/post/72886453482',
      },
      {
        src: 'images/art/tinypug.jpg',
        link: 'http://rflog.tumblr.com/post/70970017231',
        caption: 'the tiniest pug',
      },
      {
        src: 'images/art/pudgeon.jpg',
        link: 'http://rflog.tumblr.com/post/70059941111',
        caption: 'football cat sweater',
      },
    ],
    'curios': [
      {
        src: 'images/art/skollfriend.png',
        link: 'http://rflog.tumblr.com/post/96433390801',
        caption: 'skollfriend',
      },
      {
        src: 'images/art/dishwasher_indicator.jpg',
        link: 'http://rflog.tumblr.com/post/98345218271',
        caption: 'dishwasher indicator',
      },
      {
        src: 'images/art/puzzlebox.jpg',
        link: 'http://rflog.tumblr.com/post/85962876591',
        caption: 'walnut puzzle box',
      },
      {
        src: 'images/art/leakydog.jpg',
        link: 'http://rflog.tumblr.com/post/71665692731',
        caption: 'tavern sign',
      },
      {
        src: 'images/art/skull_bottles.jpg',
        link: 'http://rflog.tumblr.com/post/71487868099',
        caption: 'tiny skull bottles',
      },
      {
        src: 'images/art/headcrab.jpg',
        link: 'http://rflog.tumblr.com/post/61376993059',
        caption: 'tiny headcrab',
      },
    ],
    'paintings': [
      {
        src: 'images/art/oxtail.jpg',
        link: 'http://rflog.tumblr.com/post/137799327526',
        caption: 'oxtail',
      },
      {
        src: 'images/art/baku.jpg',
        link: 'http://rflog.tumblr.com/post/134516695731',
        caption: 'baku, eater of nightmares',
      },
      {
        src: 'images/art/brewers_blackbird.jpg',
        link: 'http://rflog.tumblr.com/post/124833775793',
        caption: "morning commute bird",
      },
      {
        src: 'images/art/selfportrait.jpg',
        link: 'http://rflog.tumblr.com/post/121562527266',
        caption: 'self-portrait',
      },
      {
        src: 'images/art/cute_bat.jpg',
        link: 'http://rflog.tumblr.com/post/114858502956',
        caption: 'the cutest bat',
      },
    ],
    'branding': [
      'images/art/validation2016.jpg',
      'images/art/validation2015.jpg',
      'images/art/stupidhackathon2016.png',
      'images/art/helmet_noggin.jpg',
      'images/art/react.jpg',
      'images/art/cocoamotive.jpg',
      'http://41.media.tumblr.com/0d271bb48e13b991da9afe00fbea5274/tumblr_nzbgzjA1yh1r24k2yo2_r1_1280.jpg',
      'http://65.media.tumblr.com/05e58ff76d2ab9e99f750b6ef88c6be8/tumblr_nt413j7DSu1r24k2yo1_1280.jpg',
    ],
    'reese': [
      'images/reese/meow_bao.jpg',
      'images/reese/pose.jpg',
      'images/reese/complementary.jpg',
      'images/reese/extra_regal.jpg',
      'images/reese/yawn.jpg',
      'images/reese/lick.jpg',
    ],
  };

  $scope.groups = {
    'hacks': {
      title: 'afternoon hacks',
      items: [
        {
          title: 'Meta Markov Mashup',
          subtitle: 'Upload text dumps, get out Markov-chain-generated mashups.',// Automation inspired by having to script <a href="https://twitter.com/bookofdatura">@bookofdatura</a>. Used to generate <a href="https://twitter.com/anatomopod">@anatomopod</a>, <a href="https://twitter.com/SlashICP">@SlashICP</a>, <a href="https://twitter.com/knitwithsolomon">@KnitWithSolomon</a>.',
          url: 'http://metamarkovmashup.herokuapp.com',
          image: 'images/metamarkovmashup.png',
        },
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
          subtitle: 'Super simple houseplant toxicity lookup for pets, based on ASPCA data',
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

    'masks': {
      title: 'masks',
      items: [
        {
          title: 'Daft Funk',
          subtitle: 'Daft Punk inspired LED mask',
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
          subtitle: 'Sabertooth tiger skull mask',
          url: 'http://rflog.tumblr.com/post/62279392814',
          image: 'images/skollmask.jpg',
        },
      ],
    },

    'calendars': {
      title: 'homononerotic sports calendars',
      subtitle: "The world's finest homononerotic satirical sports calendars. Made with 100% genuine MIT butts.",
      items: [
        {
          title: 'The Euphoria of Golf',
          url: 'http://www.zazzle.com/the_euphoria_of_golf-158502025422375595',
          image: 'images/calendar3.jpg',
        },
        {
          title: 'The Spirit of Football',
          url: 'http://www.zazzle.com/the_spirit_of_football_calendar-158847982790357840',
          image: 'images/calendar2.jpg',
        },
        {
          title: 'The Art of Tennis',
          url: 'http://www.zazzle.com/the_art_of_tennis_calendar-158761540728115422',
          image: 'images/calendar1.jpg',
        },
      ],
    },

    'projects': {
      title: 'personal projects',
      longform: true,
      items: [
        {
          title: "'Physical Dropbox' 3D Scanner",
          subtitle: "A 3D scanner in four days from $50 of off the shelf parts @ Dropbox Hack Week, with David Dohan, Abhishek Agrawal, Mason Liang. The general idea was a stepper motor controlled platform with vertical planes of light aimed at its center, which illuminated the object's deformation away from its axis of rotation. I worked on extrapolating point meshes from a series of webcam images of the rotated object, which required a lot of noise reduction.<p>Useful to know: you get a plane of light by shining a light beam through a glass rod :)</p>",
          url: 'https://github.com/dmrd/physical-dropbox',
          image: 'images/physical_dropbox.jpg',
        },
        {
          title: 'Asler',
          subtitle: 'An American Sign Language learning community with a crowdsourced video dictionary, and reverse lookup from sign characteristics such as hand shape and movement.<p>Won the <a href="http://6.470.scripts.mit.edu/">2012 MIT Web Programming Competition, 6.470</a>.</p><p>Team: <a href="http://www.stephanboyer.com/">Stephan Boyer</a>, Mark Wittels. All of us started learning web programming for this while on three different operating systems, which was fun by some defintiion.</p>',
          url: 'http://asler.herokuapp.com/',
        },
        {
          title: 'Clinical conversation analysis',
          subtitle: 'Senior project with <a href="http://web.media.mit.edu/~havasi/">Catherine Havasi</a> in the Digital Intuition group at the <a href="http://www.media.mit.edu/">MIT Media Lab</a>. Sentiment analysis and experimentation with topic identification on transcribed doctor-patient conversations.',
        },
        {
          title: 'Automated satire detection',
          subtitle: "Naive Bayes classifiers with lexical features for automated satire classification of news articles. My final project while taking Regina Barzilay's natural language processing class, <a href='http://people.csail.mit.edu/regina/6864/'>6.864</a>.<p>For luls, I <a href='http://rfol.io/satire-upgoerfive.html'>translated my writeup to Up-goer Five</a>, a.k.a. the thousand most common English words.</p>",
          url: 'https://github.com/rfong/satire',
        },
        {
          title: 'Virtual laparoscopic suturing simulator',
          subtitle: ("(Summer 2007, Stanford University)" +
            "<p>Built a haptic virtual laparoscopic suturing simulator on top of the <a href='http://sourceforge.net/projects/spring-sim/'>SPRING surgical simulator</a>.</p>" +
            "<p>My personal role was developing the haptic interface, graphics, knot detection, physics (such as modeling organs/tissues so that they would feel realistically viscoelastic through the haptic interface), object and tool models, and setups for various surgical scenarios.</p>" +
            "<p>Mentored by Dr. Craig Cornelius and Dr. Wm. LeRoy Heinrichs of the now defunct SUMMIT group (Stanford University Medical Media and Information Technologies). Dhruv Garg and Michael Fagan also worked on different areas of this project.</p>"
          ),
        },
        {
          title: 'NCreator',
          subtitle: "(Jan 2007)<p>Wrote a CNC programming visualizer and G-code generator for my high school robotics team's CNC tabletop mill that could be used to create sequences of high-level operations (facing, boring, trussing, etc) while accounting for machining constraints. CAM software was expensive, and manual G-code calculation was a slow and human-error-ridden process involving constant compensation for variables like cutter radius and appropriate feed rate and direction for various operations.</p>",
          image: 'images/ncreator.jpg',
        },
        {
          title: 'Mecanum drive',
          subtitle: '(2006)<p>Designed and made a holonomic drive system for fun. I milled 6" mecanum wheels from aluminum plate, using cheap rubber lab stops as the rollers. For the FRC 2007 season, we decided to make a second iteration with 8" waterjetted wheels.</p>Would not recommend setting the center of gravity this high.',
        },
        {
          title: 'Robotics',
          subtitle: '(2004-2008)<p>In another life called high school, I was co-captain and mechanical team lead on FIRST Robotics team 1072, where I designed, machined, and occasionally rode on unnecessarily fun things like Ackermann and holonomic drivetrains. I also trained other kids in the art of CAD and safely using heavy machinery.</p><p>Much of my serious CAD is inaccessible at the moment as I no longer have access to the proprietary software or operating system I made it in. Here are some pictures of my babies (apologies for picture quality; we were less obsessed with documentation before Facebook).</p>',
        },
      ],
    },

  };

  $scope.init();
});


// scrolling photoset
app.directive('photoset', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      photos: '=',
    },
    template: (
      '<div class="photoset">' +
      '  <span ng-repeat="photo in photos" class="photo">' +
      '    <img ng-if="isSimplePhoto(photo) || !photo.link" src="{{photo}}" />' +
      '    <a ng-if="!isSimplePhoto(photo) && photo.link" href="{{photo.link}}">' +
      '      <img src="{{photo.src}}" />' +
      '    </a>' +
      '    <p ng-if="!isSimplePhoto(photo) && photo.caption" class="note" ' +
      '       ng-bind-html="photo.caption | unsafe"></p>' +
      '  </span>' +
      '</div>'
    ),
    link: function(scope, element, attributes) {
      scope.isSimplePhoto = function(photo) { return !_.isObject(photo); };
    },
  };
});


// item-title
app.directive('itemTitle', function() {
  return {
    restrict: 'E',
    scope: {
      url: '=',
      text: '=',
    },
    template: (
      '<div ng-if="text" class="title">' +
      '  <a ng-if="url" href="{{ url }}">{{ text }}</a>' +
      '  <span ng-if="!url">{{ text }}</span>' +
      '</div>'
    ),
  };
});


// internal link
app.directive('internalLink', function() {
  return {
    restrict: 'AE',
    scope: {
      pageId: '@',  // required attribute
      text: '@',    // required attribute
    },
    template: (
      '<a class="link internal" href="{{href}}" ' +
      '   ng-click="onHandleClick()" data-page-id="{{pageId}}" ' +
      '   ng-bind-html="text | unsafe"></a>'
    ),
    link: function(scope, element, attributes) {
      scope.href = (scope.pageId === 'index' ? '/' : '#' + scope.pageId);
      scope.onHandleClick = function() {
        scope.$parent.loadPage(scope.pageId);
      };
    },
  };
});


app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

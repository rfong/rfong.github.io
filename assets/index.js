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
        $scope.show(pageId);
      } else {
        $scope.show('index');
      }
    });
  };

  $scope.show = function(page_id) {
    $('.page').addClass('hidden');
    $('.page[data-page-id=' + page_id + ']').removeClass('hidden');
  };

  $scope.photosets = {
    'firespinning': [
      'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpa1/t31.0-8/11256845_10208103149390834_5763939808569898062_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12888495_10207982038963149_6987051376159162705_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12419317_10207982043123253_7137092745838687659_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-0/p206x206/12039672_10207982037883122_2038758129675854575_n.jpg?oh=4822c21874599130acd121bd99a5fef3&oe=57E47B34',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12748093_10207721166361497_7243468677544783006_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12719316_10207721167281520_6859901092868804708_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12747900_10207721176681755_8934357202886866580_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpl1/t31.0-8/12694719_10207662207607565_2868375619169309728_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/10469540_10207662207807570_1341987910894188705_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12715963_10207662209807620_6259253558171178917_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12671610_10207662210527638_1095030931085902460_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12711131_10207629173181725_1473064351363370914_o.jpg',
      'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12401737_10207386543956146_6685424035025698402_o.jpg',
    ],
    'branding': [
      'http://41.media.tumblr.com/0d271bb48e13b991da9afe00fbea5274/tumblr_nzbgzjA1yh1r24k2yo2_r1_1280.jpg',
      'images/stupidhackathon2016.png',
      'http://65.media.tumblr.com/05e58ff76d2ab9e99f750b6ef88c6be8/tumblr_nt413j7DSu1r24k2yo1_1280.jpg',
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
          subtitle: "A 3D scanner in four days from $50 of off the shelf parts @ Dropbox Hack Week, with David Dohan, Abhishek Agrawal, Mason Liang. The general idea was a stepper motor controlled platform with vertical planes of light aimed at its center, which illuminated the object's deformation away from its axis of rotation. I worked on extrapolating point meshes from a series of webcam images of the rotated object, which required a lot of noise reduction.<p>Useful to know: you get a plane of light by shining a light beam through a glass rod.</p>",
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
          subtitle: '(Summer 2006)<p>Designed and made a holonomic drive system for fun. I milled 6" mecanum wheels from aluminum plate, using cheap rubber lab stops as the rollers. For the FRC 2007 season, we decided to make a second iteration with 8" waterjetted wheels.</p>Would not recommend setting the center of gravity this high.',
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

// internal link
app.directive('internalLink', function() {
  return {
    restrict: 'AE',
    scope: {
      pageId: '@',  // required attribute
      text: '@',    // required attribute
    },
    template: (
      '<a class="link internal" href="#{{pageId}}" ' +
      '   ng-click="onHandleClick()" data-page-id="{{pageId}}" ' +
      '   >{{text}}</a>'
    ),
    link: function(scope, element, attributes) {
      scope.onHandleClick = function() {
        scope.$parent.show(scope.pageId);
      };
    },
  };
});


app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

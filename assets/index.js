var app = angular.module('myApp', ['ngSanitize']);


// Change Angular templating from {{var}} to {[var]} to avoid Jinja conflict
app.config(['$interpolateProvider', '$httpProvider',
            function($interpolateProvider, $httpProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

// Change Underscore templating from ERB to Mustache style
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


// Set default value at hash[key] if it does not exist.
var setDefault = function(hash, key, defaultValue) {
  hash[key] = _.isUndefined(hash[key]) ? defaultValue : hash[key];
};

var callOnEnter = function(callback, e) {
  if (e.keyCode === 13) { callback(); }
};

function stopYoutube() {
  _.each($('.youtube-player'), function(player) {
    player.contentWindow.postMessage(
      '{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
  });
}

app.controller('myCtrl', function($scope, $http, $sce) {

  $(document).ready(function() {
    //group = groups['{{group}}']
  });

  // css nav to show current selection
  $scope.navSelect = function(pageId) {
    $('#sidebar a.link').removeClass('selected');
    $('#sidebar a.link[data-page-id=' + pageId + ']').addClass('selected');
  };

  $scope.loadJsonInScope = function(jsonUrl, scopeVar, callback) {
    $http({
      method: 'GET',
      url: jsonUrl,
    }).then(function successCallback(response) {
      $scope[scopeVar] = response.data;
      if (callback && _.isFunction(callback)) { callback(); }
    }, function errorCallback(response) {
      console.log("Could not fetch photosets.");
    });
  };

  $scope.loadJsonInScope('/assets/photosets.json', 'photosets');
  $scope.loadJsonInScope('/assets/groups.json', 'groups', function() {
     $scope.group = $scope.groups[$scope.groupName];  // groupName set in _group template
  });

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
      '    <img ng-if="isSimplePhoto(photo) || !photo.link" src="{{photo.src || photo}}" />' +
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
      '<a class="link internal" href="{{pageId}}.html" ' +
      '   ng-class="{\'selected\': isSelected() }" ' +
      '   data-page-id="{{pageId}}" ' +
      '   ng-bind-html="text | unsafe"></a>'
    ),
    link: function(scope, element, attributes) {
      scope.isSelected = function() {
        return scope.pageId === scope.$parent.activePageId;
      };
    },
  };
});


app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

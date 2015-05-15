angular.module('hack', [
  'ui.router',
  'hack.topStories',
  'hack.personal',
  'hack.userDashboard',
  'hack.linkService',
  'hack.authService',
  'hack.followService',
  'hack.dashboardService',
  'hack.graphService',
  'hack.tabs',
  'hack.auth',
  'ezfb'
])
.config(function(ezfbProvider, $stateProvider, $urlRouterProvider,$httpProvider) {
  ezfbProvider.setInitParams({
      appId: '836420059740734'
    });
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('/personal', {
      url: "/personal",
      templateUrl: "app/personal/personal.html",
      controller: 'PersonalController'
    })
    .state('/topStories', {
      url: "/topStories",
      templateUrl: "app/topStories/topStories.html",
      controller: 'TopStoriesController'
    })
    .state('/', {
      url: "/",
      templateUrl: "app/topStories/topStories.html",
      controller: 'TopStoriesController'
    });


        $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
    return {
      'request': function (config) {
        if (config.url.indexOf('algolia') === -1) {
          config.headers = config.headers || {};
          if ($window.localStorage.getItem('com.hack')) {
              config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('com.hack');
              config.headers['x-access-token'] = $window.localStorage.getItem('com.hack');
          }
        }
        return config;
      },
      'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
              $location.path('/signin');
          }
          return $q.reject(response);
      }
    };
  }]);
})


.filter('fromNow', function(){
  return function(date){
    return humanized_time_span(new Date(date));
  }
})

.filter('htmlsafe', ['$sce', function ($sce) { 
  return function (text) {
    return $sce.trustAsHtml(text);
  };    
}])

.directive('rotate', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.degrees, function (rotateDegrees) {
        var r = 'rotate(' + rotateDegrees + 'deg)';
        console.log(r);
        element.css({
          '-moz-transform': r,
          '-webkit-transform': r,
          '-o-transform': r,
          '-ms-transform': r
        });
      });
    }
  }
});
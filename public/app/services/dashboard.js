angular.module('hack.dashboardService', ['angular-jwt'])

.factory('Dashboard',  function($http, $window, jwtHelper, Links) {
  var dashboard = {};
  dashboard.username = null;

  return {
  	dashboard:dashboard
  };
});

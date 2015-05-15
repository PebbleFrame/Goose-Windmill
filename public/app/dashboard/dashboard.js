angular.module('hack.userDashboard', [])

.controller('DashboardController', function ($scope, Followers,Dashboard) {
  angular.extend($scope,Dashboard);
  angular.extend($scope,Followers);
});
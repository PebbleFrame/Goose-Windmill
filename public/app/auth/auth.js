angular.module('hack.auth', [])

.controller('AuthController',function ($scope, $window, $location, Auth, Dashboard) {
  $scope.username = null;
  $scope.user = {};
  $scope.newUser = {};
  $scope.loggedIn = Auth.isAuth();
  if($scope.loggedIn){
    $scope.username = $window.localStorage.getItem('hfUser');
  }
  $scope.badLogin = false;
  $scope.badLoginMessage = '';
  $scope.badSignup = false;
  $scope.badSignupMessage = '';

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        $scope.badLogin = false;
        $scope.badLoginMessage = '';
        $scope.badSignup = false;
        $scope.badSignupMessage = '';
        $window.localStorage.setItem('com.hack', data.token);
        $window.localStorage.setItem('hfUsers', data.followers)
        $window.localStorage.setItem('hfUser', Auth.getUser())

        Dashboard.init(data.followers.split(","));

        $scope.loggedIn = true;
        $scope.user = {};
        $scope.username = Auth.getUser()
      })
      .catch(function (error) {
        $scope.badSignup = false;
        $scope.badSignupMessage = '';
        $scope.badLogin = true;
        $scope.badLoginMessage = error;
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.newUser.following = Dashboard.following.join(',');

    Auth.signup($scope.newUser)
      .then(function (data) {
        $scope.badLogin = false;
        $scope.badLoginMessage = '';
        $scope.badSignup = false;
        $scope.badSignupMessage = '';
        $window.localStorage.setItem('com.hack', data.token);
        $window.localStorage.setItem('hfUser', Auth.getUser());

        $scope.loggedIn = true;
        $scope.newUser = {};
        $scope.username = Auth.getUser()
      })
      .catch(function (error) {
        $scope.badLogin = false;
        $scope.badLoginMessage = '';
        $scope.badSignup = true;
        $scope.badSignupMessage = error;
        console.error(error);
      });
  };

  $scope.logout = function () {
    Auth.signout();
    Dashboard.init();
    $scope.loggedIn = false;
    $scope.username = null;
  }
});

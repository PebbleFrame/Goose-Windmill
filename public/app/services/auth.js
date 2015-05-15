angular.module('hack.authService', [])

.factory('Auth', function ($http, $location, $window) {
  var username = null;
  var getUser = function(){
    return username;
  }
  var signin = function (user) {
    username = user.username;
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    username = user.username;
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.hack');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.hack');
    $window.localStorage.removeItem('hfUsers');
    $window.localStorage.removeItem('hfUser');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    getUser: getUser
  };
});
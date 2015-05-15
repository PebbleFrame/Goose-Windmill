// HOW OUR FOLLOWING SYSTEM WORKS:
// We want users to be able to follow people before they even
// log in, because who actually has time to decide on a username/password?

// So, we do this by saving the users that they follow into localStorage.
// On signup, we'll send the users string in localStorage to our server
// which wil save them to a database.

angular.module('hack.dashboardService', ['angular-jwt'])

.factory('Dashboard',  function($http, $window, jwtHelper, Links) {
  var following = [];

  var updateFollowing = function(){
    
    // refresh personal stories
    Links.getPersonalStories(following);
    // update localStorage
    $window.localStorage.setItem('hfUsers', following);

    var token = $window.localStorage.getItem('com.hack');
    var user;
    if (!!token) {
      user = jwtHelper.decodeToken(token).user;
    }

    if(!!user){
      var data = {
        username: user,
        following: following
      };

      $http({
        method: 'POST',
        url: '/api/users/updateFollowing',
        data: data
      });
    }
  };

  var addFollower = function(username){

    if (following.indexOf(username) === -1) {
      following.push(username);
      // makes call to database to mirror our changes
      updateFollowing();
    }

  };
  var removeFollower = function(username){

    if (following.indexOf(username) > -1) {
      following.splice(following.indexOf(username), 1);
      // makes call to database to mirror our changes
      updateFollowing();
    }

  };

  var userFeeds = [];
  var saveFeed =function(){}; 
  var deleteFeed = function(){}; 


  var userHashes = [];
  var updateUserHashes = function(){};
  var addHash = function(hash){};
  var removeHash = function(hash){};

  var selectedUsers = [];

  var addSelectedUser = function(username){
    selectedUsers.push(username);
  }
  var removeSelectedUser = function(username){
    var userIndex = selected.indexOf(username)
    selectedUsers.splice(userIndex, 1);
  }

  var selectedhashes = [];
  var addSelectedHash = function(){};
  var removeSelectedHash = function(){};

  var localStorageUsers = function(){
    return $window.localStorage.getItem('hfUsers');
  }


  // this function takes the csv in localStorage and turns it into an array.
  // There are pointers pointing to the 'following' array. The 'following' array
  // is how our controllers listen for changes and dynamically update the DOM.
  // (because you can't listen to localStorage changes)
  var localToArr = function(){
    // if(!localStorageUsers()){
    //   // If the person is a new visitor, set pg and sama as the default
    //   // people to follow. Kinda like Tom on MySpace. Except less creepy.
    //   $window.localStorage.setItem('hfUsers', 'pg,sama');
    // }
    if (localStorageUsers()) {
      var users = localStorageUsers().split(",");
      return users;
    }
  }

  var init = function(saved_followers){
    var users = saved_followers || localToArr();
    following.splice(0, following.length);
    following.push.apply(following, users);    
    // refresh personal stories
    Links.getPersonalStories(following);
    $window.localStorage.setItem('hfUsers', following);
  };

  init();

  return {
    following: following,
    addFollower: addFollower,
    removeFollower: removeFollower,
    localToArr: localToArr,
    addSelected: addSelected,
    removeSelected: removeSelected,
    init: init
  }
})

angular.module('hack.personal', [])

.controller('PersonalController', function ($scope, $window, Links, Followers, Graph) {
  $scope.stories = Links.personalStories;
  $scope.users = Followers.following;
  $scope.perPage = 30;
  $scope.index = $scope.perPage;

  var init = function(){
    fetchUsers();
  };
  
  var fetchUsers = function(){
    Links.getPersonalStories($scope.users);
  };

  $scope.graphStory = function(storyId){
    Graph.makeGraph(storyId);
    $scope.currentGraphedStory = storyId;
  };
  
  init();
});

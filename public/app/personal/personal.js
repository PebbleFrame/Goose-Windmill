angular.module('hack.personal', [])

.controller('PersonalController', function ($scope, $window, Links, Dashboard, Graph) {
  $scope.stories = Links.personalStories;
  $scope.users = Dashboard.following;
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

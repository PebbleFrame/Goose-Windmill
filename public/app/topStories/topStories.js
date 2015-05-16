angular.module('hack.topStories', [])

.controller('TopStoriesController', function ($scope, $window, Links, Dashboard, ezfb, Graph) {
  angular.extend($scope, Links);
  $scope.stories = Links.topStories;
  console.log($scope.stories);
  $scope.perPage = 30;
  $scope.index = $scope.perPage;
  $scope.currentGraphedStory;

  $scope.shareStory = function(url){
    ezfb.ui({
      method: 'share',
      href: url
      }, function(response){});
  };

  $scope.graphStory = function(storyId){
    Graph.makeGraph(storyId);
    $scope.currentGraphedStory = storyId;
  };

  $scope.currentlyFollowing = Dashboard.following;

  $scope.getData = function() {
    Links.getTopStories();
  };
  
  $scope.addUser = function(username) {
    Dashboard.addFollower(username);
  };

  $scope.getData();
});


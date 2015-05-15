angular.module('hack.userDashboard', [])

.controller('DashboardController', function ($scope, Followers,Dashboard) {
  angular.extend($scope,Dashboard);
})

.controller('FollowingController', function ($scope,Dashboard) {
  angular.extend($scope,Dashboard);
  angular.extend($scope,Followers);
  console.log("HEllo")
  $scope.userSelected = false;
  $scope.toggleUser = function(user){
  	console.log("Toggling")
  	if($scope.userSelected ===false){
  		$scope.userSelected = true;
  		$scope.addSelectedUser(user);
  	}
  	else{
  		$scope.userSelected = false;
  		$scope.removeSelectedUser(user);
  	}
  }
})
.controller('HashController', function ($scope,Dashboard) {
  angular.extend($scope,Dashboard);
  angular.extend($scope,Followers);
  $scope.hashSelected = false;
  $scope.toggleHash = function(hash){
  	if($scope.hashSelected ===false){
  		$scope.hashSelected = true;
  		$scope.addSelectedHash(hash);
  	}
  	else{
  		$scope.userSelected = false;
  		$scope.removeSelectedHash(user);
  	}
  }
})
.controller('FeedController', function ($scope,Dashboard) {
  angular.extend($scope,Dashboard);
  angular.extend($scope,Followers);
  $scope.hashSelected = false;
  $scope.selectFeed = function(feed){
   	if($scope.feedSelected ===false){
  		$scope.feedSelected = true;
  		$scope.setSelectedFeed(feed);
  	}
  	else{
  		$scope.feedSelected = false;
  		$scope.removeSelectedHash(user);
  	}
  }
});
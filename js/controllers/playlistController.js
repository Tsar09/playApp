audioApp.controller('playerController', ['$scope', '$http' ,'ngAudio', 'PlayerFactory',
function($scope, $http,ngAudio, PlayerFactory){
 var data = [];


  $http.get('data/playlist.json')
    .success(function(response){
      data = response;
    //  $scope.audio = new PlayerFactory('content/sounds/', data)
    $scope.audio = new PlayerFactory('content/sounds/', data);
  //  $scope.audio.updateTrack();
    });
}]);

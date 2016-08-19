"use strick"

audioApp.controller('playerController', ['$scope', '$http' ,'ngAudio',function PlaylistController($scope, $http,ngAudio){
  $scope.name = 'nn';

  $scope.currentTrack = 0;

  $scope.audio =ngAudio.load("content/sounds/Bumboks-Ditina.mp3");
  $scope.data = [];


  $scope.a = function(){


  };

    $scope.playpause = function(){ var a = $scope.audio.paused ? $scope.audio.play() : $scope.audio.pause(); };

  $scope.updateTrack = function(){
      // $scope.audio.stop();
        var playing = !$scope.audio.paused;
      // $scope.audio.src = "content/sounds/" +  $scope.data[$scope.currentTrack].file;
        $scope.audio = ngAudio.load("content/sounds/" +  $scope.data[$scope.currentTrack].file);

        var a = playing ? $scope.audio.play() : $scope.audio.pause();
        $scope.info = $scope.data[$scope.audio.currentTrack];
        $scope.currentNum = $scope.audio.currentTrack;
        $scope.totalNum =  $scope.data.length;
      //  $scope.audio.play();
      };


    $scope.next = function(){
    $scope.currentTrack++;
    $scope.audio.stop();
    if ($scope.currentTrack < $scope.data.length){
      $scope.updateTrack();
    }else{
      $scope.currentTrack=0;
      $scope.updateTrack();
    }
  };

  $scope.prev = function(){
    $scope.currentTrack--;
    $scope.audio.stop();
    if ($scope.currentTrack >= 0){
      $scope.updateTrack();
    }else{
      $scope.currentTrack = 0;
      $scope.updateTrack();
    }
  };

  $http.get('data/playlist.json')
    .success(function(response){
      $scope.data = response;
      $scope.updateTrack();
    });
}]);

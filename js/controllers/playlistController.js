audioApp.controller('playerController', ['$scope', '$http' ,'ngAudio', 'PlayerFactory',
function($scope, $http,ngAudio, PlayerFactory){
 var data = [];


  $scope.$watch("audio.model.progress", function(){

    var element = angular.element(document.querySelector("#song-slider"));

    var min = element.attr("min"),
       max = element.attr("max"),
       val = element.prop("value");

   element.css({
     'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
   });

   if(val ===max){
     $scope.audio.next();
   }
 });
$scope.$watch("audio.model.volume", function(){
  var element = angular.element(document.querySelector("#volume-slider"));
 element.css({
   'backgroundSize': $scope.audio.model.volume * 100 + '% 100%'
 });

});
  $http.get('data/playlist.json')
    .success(function(response){
      data = response;
      $scope.audio = new PlayerFactory('content/sounds/', data);

    });
}]);

audioApp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

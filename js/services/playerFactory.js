"use strict"

audioApp.factory('PlayerFactory', ['ngAudio' , '$http', function(ngAudio, $http){

  var audio, currentTrack =0;

  var PlayerFactory = function(audioSrc, data) {
         //this.data = data;
         PlayerFactory.audioSrc = audioSrc;
         PlayerFactory.prototype.data = data;
         PlayerFactory.prototype.updateTrack();
     };

  PlayerFactory.prototype.playpause = function(){
    var playing = audio.paused;
    return playing ? audio.play() : audio.pause();
  };

  PlayerFactory.prototype.updateTrack = function(){
    PlayerFactory.prototype.model =  audio = ngAudio.load(PlayerFactory.audioSrc
      +  PlayerFactory.prototype.data[currentTrack].file);

     PlayerFactory.prototype.info = PlayerFactory.prototype.data[currentTrack];
     PlayerFactory.prototype.currentNum = currentTrack;
     PlayerFactory.totalNum =  PlayerFactory.prototype.data.length;

     audio.play();
  };

  PlayerFactory.prototype.next = function(){
    currentTrack++;
    audio.stop();
    if (currentTrack >= PlayerFactory.data.length){
      currentTrack=0;
    }
      PlayerFactory.prototype.updateTrack();
  };

  PlayerFactory.prototype.prev = function(){
      currentTrack--;

      if (currentTrack >= 0){
        audio.stop();
        PlayerFactory.prototype.updateTrack();
      }else{
        currentTrack = 0;
      }
    };


    // $http.get('data/playlist.json')
    //   .success(function(response){
    //     data = response;
    //    PlayerFactory.updateTrack();
    //   });

   return PlayerFactory;
}]);

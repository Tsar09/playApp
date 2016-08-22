"use strict"

audioApp.factory('PlayerFactory', ['ngAudio' , '$http', function(ngAudio, $http){

  var audio, currentTrack =0;

  var PlayerFactory = function(audioSrc, data) {
         //this.data = data;
         PlayerFactory.audioSrc = audioSrc;
         PlayerFactory.data = data;
         PlayerFactory.prototype.updateTrack();
     };

  PlayerFactory.prototype.playpause = function(){
    var playing = audio.paused;
    return playing ? audio.play() : audio.pause();
  };

  PlayerFactory.prototype.updateTrack = function(){
     audio = ngAudio.load(PlayerFactory.audioSrc +  PlayerFactory.data[currentTrack].file);

     PlayerFactory.prototype.info = PlayerFactory.data[audio.currentTrack];
     PlayerFactory.prototype.currentNum = audio.currentTrack;
     PlayerFactory.totalNum =  PlayerFactory.data.length;

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
  //  PlayerFactory.progress = audio.progress;
    // PlayerFactory.prototype.progress = {
    //   get p() {
    //     return audio.progress;
    //   },
    //
    //   set p(a) {
    //     this = audio.progress;
    //   }
    // };
    PlayerFactory.prototype.progress =function(){
      return audio.progress;
    };


    // $http.get('data/playlist.json')
    //   .success(function(response){
    //     data = response;
    //    PlayerFactory.updateTrack();
    //   });

   return PlayerFactory;
}]);

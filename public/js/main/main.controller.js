'use strict';

angular.module('simiTunes').controller('mainCtrl', function ($scope,itunesService) {
    $scope.artist = '';
    $scope.currentSong = '';

    $scope.search = search;
    $scope.play = play;

    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            'look for *val' : function(val){
                $scope.search(val);
                $scope.$apply();
            },
            'play track *val' : function(val){
                $scope.play(val-1);
                $scope.$apply();
            },
            'start again' : function(){
                $scope.clearCompleted();
                $scope.$apply();
            }

        };

        // Add our commands to annyang
        annyang.addCommands(commands);
        annyang.debug();
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
    }

    function search(artist) {
        itunesService.getMusic(artist).then(function (data) {
            $scope.musicList = data.data.results;
            console.log($scope.musicList);
        });
    }
    function play(i) {
        console.log($scope.musicList[i].previewUrl);
        document.location.href = $scope.musicList[i].previewUrl;
       // $scope.currentSong = $scope.musicList[i].previewUrl;
    }
});
angular.module('simiTunes').service('itunesService', function ($http) {
    this.getMusic = function (artist) {
        return $http({method: 'JSONP', url: 'https://itunes.apple.com/search?term='+artist+'&callback=JSON_CALLBACK'});
    };
});
app.controller("mainController", function($scope, $http){

	 $scope.apiKey = "8c6812fed77d27d9d83063ed4cd8c28b15fa0cb79fffc0f405ac57bc57ab1b68";
	 $scope.filterText = null;
	 $scope.results = [];
	 $scope.availableGenres = [];
     $scope.genreFilter = null;
	 $scope.init = function() {
    	 //API requires a start date
        var today = new Date();
        //Create the date string and ensure leading zeros if required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        console.log($http.defaults.headers.common);
        $http({
            method : "GET",
            url : 'https://api-v2launch.trakt.tv/calendars/all/shows/premieres'  + '/' + 10	 + '?extended=full,images',
            headers: { 'trakt-api-key' : '8c6812fed77d27d9d83063ed4cd8c28b15fa0cb79fffc0f405ac57bc57ab1b68',
            	"trakt-api-version" : "2"}
        }).then(function mySucces(response) {
        	angular.forEach(response.data, function(tvshow, key) {
			    $scope.results.push(tvshow);
			    
			    angular.forEach(tvshow.show.genres, function(genre, index){
                    var exists = false;
                    angular.forEach($scope.availableGenres, function(avGenre, index){
                        if (avGenre == genre) {
                            exists = true;
                        }
                    });
                    if (exists === false) {
                        $scope.availableGenres.push(genre);
                    }
                });
			    
        	}) 
        	console.log('data is' , response.data);
        }, function myError(response) {
        	console.log(response.statusText);
        });
    };

    $scope.setGenreFilter = function(genre) {
        $scope.genreFilter = genre;
    }
    
    
});

app.config(['$httpProvider', function($httpProvider) {
	console.log('delete header');
	delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])

app.filter('isGenre', function() {
        return function(input, genre) {
            if (typeof genre == 'undefined' || genre == null) {
                return input;
            } else {
                var out = [];
                for (var a = 0; a < input.length; a++){
                    for (var b = 0; b < input[a].show.genres.length; b++){
                        if(input[a].show.genres[b] == genre) {
                            out.push(input[a]);
                        }
                    }
                }
                return out;
            }
        };
    });


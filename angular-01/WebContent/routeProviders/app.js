var angularJSApp = angular.module('AngularJSApp',[]);

angularJSApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/users',{
		templateUrl: "template/users.html",
		controller: 'UsersCtrl'
	}).otherwise({
		templateUrl: "template/error.html"
	});
}]);

angularJSApp.controller('UsersCtrl',function($scope){
	$scope.users = [
                     {
                   	  name:'Arun Menon',
                   	  description:'Mine',
                   	  house:'house1'
                       },
                       {
                       	name:'Sherlock',
                     	  	description:'Sherlocks',
                     	  house:'house2'
                       }
                    ];
});
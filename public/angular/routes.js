(function(){
'use strict';
angular.module('dogs-routes',[])
// configure our routes
	.config(function($routeProvider) {
		$routeProvider
			
			// route for the home page
			.when('/', {
				templateUrl : 'templates/home-template.html',
			})

			.when('/dog/:breed',{
				templateUrl : 'templates/one-dog-template.html'
			})
			.otherwise({redirectTo: '/'});

	});
})();

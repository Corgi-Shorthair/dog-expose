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

			.when('/corgi',{
				templateUrl : 'templates/one-dog-template.html'
			});

	});
})();

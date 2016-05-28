(function(){
	var app = angular.module("dogs",['ngRoute','dogs-routes','dogs-directives']);

	app.factory('socket', ['$rootScope', function($rootScope) {
  		var socket = io.connect();
  		return {
    		on: function(eventName, callback){
      			socket.on(eventName, callback);
    		},
    		emit: function(eventName, data) {
      			socket.emit(eventName, data);
    		}
  		};
	}]);

	app.controller("DogController",['$scope','$http','socket', function($scope,$http,socket){
		var dogs = this;
		dogs.products = [];
		$http.get('/data/alldogs').success(function(data){
			dogs.products = data;
		});
		
		var indexRecord = null;
		this.sendLikes = function(index){
			indexRecord = index;
			var currentDog = this.products[index];
			var currentLikes = this.products[index].likes + 1;
			var updateData = "likes=" + encodeURIComponent(currentLikes) + "&name=" + encodeURIComponent(currentDog.name);
			$http({
   				 url: '/data/likes',
   				 method: 'POST',
    			 headers:{'content-type': "application/x-www-form-urlencoded"},
                 data: updateData
			}).success(function(data){
    			currentDog.likes = currentLikes;
			});
			var senddata =  {index:indexRecord, newLikes:currentLikes };
			socket.emit('sendlike', senddata) ;
			return false;
		};

		socket.on('sendlike',function(data){
      console.log('catch!'); 
      console.log(data);
			dogs.products[data.index].likes = data.newLikes;
      $scope.$apply();
		});


	}]);

	app.controller("IndividualDogController", [ '$http', '$routeParams', '$scope',function($http, $routeParams, $scope){
		var dog = this;
		dog.product = {};

		var url = '/data/'+$routeParams.breed;
		$http.get(url).success(function(data){
			dog.product = data;
		});

	}]);

	app.controller("PanelController",function(){
		// initialize the default tab
		this.tab = 1;
		// (click) to set a tab
		this.setTab = function(selectTab){
			this.tab = selectTab;
		};
		//check whether a tab is selected
		this.isSetTab = function(checkTab){
			return this.tab === checkTab;
		};
	});
  	
  app.controller("CommentController", ['$http', '$scope', '$routeParams', function($http,$scope,$routeParams){
    	// store this instance and be used in $http service
      var current = this;
      current.comment = {};
      current.comments = [];
    	
      	this.addComment = function(allcomment,parentDog){
      		allcomment.push(current.comment);
      		dataString = "author=" + encodeURIComponent(current.comment.author)+"&body="+encodeURIComponent(current.comment.body)+"&parentDog="+encodeURIComponent(parentDog);
			    $http({
   				    url: '/data/add-comment',
   				    method: 'POST',
    			    headers:{'content-type': "application/x-www-form-urlencoded"},
              		data: dataString
			    }).success(function(data){
              // if success, clear the comment area
              current.comment = {};
          });
      	};
      $http.get('/data/comments/'+ $routeParams.breed).success(function(data){
          current.comments = data;
      }); 
  }]);
	
	app.controller("ImageController", [ '$http', '$scope','$routeParams', function($http, $scope, $routeParams){
		var dog = this;
		dog.images = [];
		dog.bigImageSource=null;

		$http.get('/data/images/'+ $routeParams.breed).success(function(data){
      		console.log(data);
			dog.images = data;
			dog.bigImageSource = dog.images[0].source;
		});
		$scope.ChangeImage = function(newSource){
			dog.bigImageSource = newSource;
		};
		$scope.NextImage = function(){
			for(var i=0;i<5;i++){
				if(dog.bigImageSource === dog.images[i].source) {
					dog.bigImageSource = dog.images[(i+1)%5].source;
					break;
				}
			}
		}; 
	}]);

    app.controller("UrlController", ['$scope', '$log', '$window', function($scope, $log, $window){
    	$scope.ClickMeToRedirect = function(dogname){
    		//dogname = dogname.split(" ").join("-");
    		console.log(dogname);
    		var url = "#/dog/"+ encodeURIComponent(dogname);
    		$log.log(url);
    		$window.location.href = url;
    	};
    }]);

    
})();
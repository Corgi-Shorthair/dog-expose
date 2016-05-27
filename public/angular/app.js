(function(){
	var app = angular.module("dogs", []);

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

	app.controller("IndividualDogController", [ '$http', function($http){
		var dog = this;
		dog.product = {};
		
		$http.get('/data/individualdog').success(function(data){
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
  	/*
  	app.controller("CommentController", ['$http', function($http){
    	this.comment = {};
    	this.addComment = function(product){
      		product.comments.push(this.comment);
      		this.comment = {};
      	};
      	var dog = this;
      	dog.comments = [];
      	$http.get('/data/individualdog/comments').success(function(data){
      		dog.comments = data;
      	});
    }]);
	*/
  	app.controller("CommentController", ['$http', function($http){
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
      
      $http.get('/data/individualdog/comments').success(function(data){
          current.comments = data;
      });
  	}]);
	
	app.controller("ImageController", [ '$http', '$scope', function($http, $scope){
		var dog = this;
		dog.images = [];
		dog.bigImageSource=null;
		$http.get('/data/individualdog/images').success(function(data){
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
    		dogname = dogname.split(" ").join("-");
    		console.log(dogname);
    		var url = "http://" + $window.location.host + "/" + dogname;
    		$log.log(url);
    		$window.location.href = url;
    	};
    }]);

    app.directive("headerBar", function(){
    	return {
    		restrict: "E",
    		templateUrl: "header-bar.html"
    	};
    });

    app.directive("imageGallery", function(){
    	return {
    		restrict: "E",
    		templateUrl: "image-gallery.html"
    	};
    });

    app.directive("commentTab", function(){
    	return {
    		restrict :"E",
    		templateUrl: "comment-tab.html"
    	};
    });
})();
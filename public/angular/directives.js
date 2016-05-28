(function(){
angular.module('dogs-directives',[])
    .directive("headerBar", function(){
    	return {
    		restrict: "E",
    		templateUrl: "templates/directiveTemplates/header-bar.html"
    	};
    })

    .directive("imageGallery", function(){
    	return {
    		restrict: "E",
    		templateUrl: "templates/directiveTemplates/image-gallery.html"
    	};
    })

    .directive("commentTab", function(){
    	return {
    		restrict :"E",
    		templateUrl: "templates/directiveTemplates/comment-tab.html"
    	};
    });
})();
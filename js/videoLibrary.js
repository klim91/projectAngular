angular.module("videoApp", ["firebase", "ui.router"])

    .config(function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/home.html'
            });
          $urlRouterProvider.otherwise('/home');
    })
    
    .constant("FIREBASE_URI", "https://videolibrary-klim91.firebaseio.com/")
    
    .controller("videoCtrl",  function($scope, VideoService){
        $scope.newCategory = {name: ''};
        $scope.currentCategory = null;
        
        $scope.categories = VideoService.getCategories();
        $scope.addCategory = function(category) {
            VideoService.addCategory({description: category});
        };
        $scope.removeCategory = function(category){
            VideoService.removeCategory(category);
        };
        $scope.updateCategory = function(category){
            VideoService.updateCategory(category);
        };
        
    })
    
    .factory("VideoService", function($firebase, FIREBASE_URI){
        var refCategory = new Firebase(FIREBASE_URI);
        var sync = $firebase(refCategory);
        var categories = sync.$asArray();
        
        var getCategories = function(){
            return categories;    
        };
        
        var addCategory = function(category){
            categories.$add(category);
        };
        
        var removeCategory = function(category){
            categories.$remove(category);   
        };
        
        var updateCategory = function(category){
            categories.$save(category);
        };
        
        return {
            getCategories: getCategories,
            addCategory: addCategory,
            removeCategory: removeCategory,
            updateCategory: updateCategory
        }
        
    })
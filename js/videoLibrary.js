angular.module("videoApp", ["firebase", "ui.router"])

    .config(function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/home.html'
            })
          $urlRouterProvider.otherwise('/home');
    })
    
    .constant("FIREBASE_URI", "https://videolibrary-klim91.firebaseio.com/")
    
    .controller("imageCtrl",  function($scope, ImageService, BookmarksImageService){
        
        $scope.categories = ImageService.getCategories();
        $scope.bookmarks = BookmarksImageService.getBookmarks();
        
        $scope.addCategory = function(category) {
            ImageService.addCategory(category);
        };
        $scope.removeCategory = function(category){
           BookmarksImageService.removeAllBookmarkForCategory(category);
           ImageService.removeCategory(category);
        };
        $scope.updateCategory = function(category){
            ImageService.updateCategory(category);
        };
        
        $scope.addBookmark = function(bookmark) {
            BookmarksImageService.addBookmark(bookmark);
        };
        $scope.removeBookmark = function(bookmark){
            BookmarksImageService.removeBookmark(bookmark);
        };
        $scope.updateBookmark = function(bookmark){
            BookmarksImageService.updateBookmark(bookmark);
        };
        
    })
    
    .factory("ImageService", function($firebase, FIREBASE_URI){
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
    
    .factory("BookmarksImageService", function($firebase, FIREBASE_URI){
        var refBookmarks = new Firebase(FIREBASE_URI+"/bookmarks");
        var sync = $firebase(refBookmarks);
        var bookmarks = sync.$asArray();    
        
        var getBookmarks = function(){
            return bookmarks;
        };
        var addBookmark = function(bookmark){
            bookmarks.$add(bookmark);
        };
        var removeBookmark = function(bookmark){
            bookmarks.$remove(bookmark);
        };
        var updateBookmark = function(bookmark){
            bookmarks.$save(bookmark);    
        };
        var removeAllBookmarkForCategory = function(category){
            var k = bookmarks.length;
            for (var i = 0; i < k; i++) {
                if (bookmarks[i].categoryname === category.name) {
                    bookmarks.$remove(i);
                }
            }
        };
        
        return {
            getBookmarks: getBookmarks,
            addBookmark: addBookmark,
            removeBookmark: removeBookmark,
            updateBookmark: updateBookmark,
            removeAllBookmarkForCategory: removeAllBookmarkForCategory
        }
    })
angular.module("videoApp", ["firebase", "ui.router"])

    .config(function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/home.html'
            })
            .state('category', {
                url: '/category',
                templateUrl: 'template/categories.html'
            })
           .state('bookmark', {
                url: '/category/bookmark/:title',
                templateUrl: 'template/categories.bookmark.html'
            });
          $urlRouterProvider.otherwise('/home');
    })
    
    .constant("FIREBASE_URI", "https://videolibrary-klim91.firebaseio.com/")
    
    .controller("imageCtrl",  function($scope, ImageService, BookmarksImageService){
        
        $scope.categories = ImageService.getCategories();
        $scope.bookmarks = BookmarksImageService.getBookmarks();
        $scope.currentCategory = null;
        $scope.currentBookmark = null;
        $scope.currentBookmarks = [];
        $scope.showEditCategory = false;
        $scope.showEditBookmark = false;
        
        $scope.addCategory = function(category) {
            if(!ImageService.isExistsCategory(category))
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
        $scope.setActiveCategory = function(category){
            $scope.currentCategory = category;
            $scope.currentBookmark = null;
            $scope.setBookmarkForCategory(category);
        };
        $scope.setBookmarkForCategory = function(category){
            $scope.currentBookmarks = [];
            var len = $scope.bookmarks.length;
            for(var i=0; i<len; i++){
                if($scope.bookmarks[i].categoryname ===  category.name){
                     $scope.currentBookmarks.push($scope.bookmarks[i]);
                }
            }
        };
         $scope.setActiveBookmark = function(bookmark){
            $scope.currentBookmark = bookmark;
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
        
        var isExistsCategory = function(category){
            var len = categories.length;
            for(var i=0; i<len; i++){
                if(categories[i].name === category.name)
                    return true;
            }
            return false;
        };
        
        return {
            getCategories: getCategories,
            addCategory: addCategory,
            removeCategory: removeCategory,
            updateCategory: updateCategory,
            isExistsCategory: isExistsCategory
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
            var len = bookmarks.length;
            for (var i=0; i<len; i++) {
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
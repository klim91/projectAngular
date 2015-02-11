angular.module("videoApp", ["ui.router", "videoApp.factoryImageService", "videoApp.factoryBookmarkService"])

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
        
    });
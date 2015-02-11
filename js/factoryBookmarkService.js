angular.module("videoApp.factoryBookmarkService", ["firebase"])

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
    });
function getFeed() {
    return $.getJSON('spoonfed/app/scripts/categories.json').then(function (categories) {
        var tempStory = [], promises = [];
        for (var category in categories) {
            if (categories[category][2] === true) {
                promises.push(getFeedURLs(categories[category][0]).then(function (rssData) {
                    for (var item in rssData) {
                    	if (item !== "category"){
                        tempStory.push(rssData[item]);
                    	}
                    }
                }));
            }
        }
        return $.when.apply($, promises).then(function() {
            // return results array as the fulfilled value of the promise
            return tempStory;
        });
    });
}

function getFeedURLs (feed) {
//GET request to the Google API RSS reader.
console.log('Sending for RSS...');
return $.ajax({
  url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=" + encodeURIComponent(feed),
  type: "GET",
  dataType: "jsonp"
})
.then(function(data) {
	console.log(data);
	return data.responseData.feed.entries;
});
}

  var app = angular.module('spoonFed', []);
  app.controller('StoryController', function($scope){
    getFeed().then(function(data) {
      $scope.savedStories = data;
    }, function(err) {
      console.log('Error', err);
    });
    
  });

$(document).ready(function(){
});
var getFeedURLs = function(feed) {
    //GET request to the Google API RSS reader.
      return $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=" + encodeURIComponent(feed),
            type: "GET",
            dataType: "jsonp"
            }).then(function(data) {
            //pass on the id to this article object
            data.responseData.feed.entries.category = feed[1];
            //return the article object
            return data.responseData.feed.entries;
          });
}

var summarise = function(data){
    //GET request to the summarisation API
    //data.link is the url of the article
    var summaryfeed = data.link;
    return $.ajax({
    url: "https://joanfihu-article-analysis-v1.p.mashape.com/link?entity_description=False&link=" + encodeURI(summaryfeed),
    type: "GET",
    headers: {"X-Mashape-Key": "Ul1DH83LxvmshqXbCrkoyi6dEZX0p18mLJZjsn3gJ1NQuk9VEG"}
      })
      .then(function(callback) {
        data.summary = callback.summary.join(' ');
        data.keywords = callback.tags;
        data.photourl = callback.image;
        return data;
      }); 
}
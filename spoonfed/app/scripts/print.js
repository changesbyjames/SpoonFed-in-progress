var savedStories = [];

var buildArticle = function(data) {
    var currentArticle = {
      "image":data.photourl,
      "title":data.title,
      "catagory":data.catagory,
      "encodedsummary":encodeURI(data.summary)
    }
    savedStories.push(currentArticle);
}
var getArticles = function(feed, id){
    getFeedURLs(feed, id)
    .then(function(data) {
        var l = data.length;
        for (var o=0;o<l;o++){
            data[o].ios = data.ios;
            summarise(data[o])
            .then(buildArticle);
        }
    });
}
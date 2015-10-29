var buildArticle = function(data) {
    var currentArticle = {
      "image":data.photourl,
      "title":data.title,
      "catagory":data.catagory,
      "encodedsummary":encodeURI(data.summary)
    }
    return currentArticle;
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

var articleInit = function(){
  $.getJSON('spoonfed/app/scripts/categories.json', function(data){
    for (var i in data){
      if (data[i][2] == true){
        getArticles(data[i][0]);
      }
    }
  })
}

$(document).ready(function(){

  $('.nav-profile').click(function(){
    FB.login();
  })

  $('.nav-catagories').click(function(){
    if( $(this).attr('id') == "closed" ){
      $('header').addClass('header-open');
      $('.container').addClass('container-close');
      $('.nav-catagories').attr('id', 'open');
    }else{
      $('header').removeClass('header-open');
      $('.container').removeClass('container-close');
      $('.nav-catagories').attr('id', 'closed');
    }
   })

    $(function() {
      FastClick.attach(document.body);
    });
  })
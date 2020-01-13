// $("#test").on("click", function(){
//     alert("sup")
// })



var topics = ['Demon Slayer', 'Naruto','One Piece','Fullmetal Alchemist','Attack on Titans', 'nsfw']
console.log(topics[2])

//loop to dynamically create gif buttons
$(document).ready(function() {

for (var i = 0; i < topics.length; i++) {
    //store <button> into var
    //var animeBttn = $("<button>")
    //add text to button
    var animeBttn = $("<button>").text(topics[i])
    //add data attr to button
    $(animeBttn).attr("data-anime", topics[i])
    $(animeBttn).attr("class", "gifBttn")

    $("#gif-buttons").append(animeBttn)
}

//y u no work >:( :sademoji: 
//nvm fixed it


})

//on click event listener for gif buttons
$(document).on("click", ".gifBttn", function(){
//$("button").on("click", function() {
    var anime = $(this).attr("data-anime");
    console.log("clicked")

  //ajax call to giphy api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      anime + "&api_key=TnrUMe7wuNGbQa9QnDgl0GHC3ahMdl6q";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      
      .then(function(response) {
        var results = response.data;
        console.log(results)
      
        for (var i = 0; i < results.length; i++) {

          //only display safe for work images (lol)
          if (results[i].rating !== "pg" && results[i].rating !== "pg-13") {
           
            var gifDiv = $("<div>");

            var rating = results[i].rating;
            
            var p = $("<p>").text("Rating: " + rating.toUpperCase());

            var animeImage = $("<img>");
            
            //default image will animate
            animeImage.attr("src", results[i].images.fixed_height.url);
            
            //add attr: animate, still image
            animeImage.attr("data-still", results[i].images.fixed_height_still.url);
            animeImage.attr("data-animate", results[i].images.fixed_height.url);

            animeImage.attr("class", "gif");


            gifDiv.append(p);
            gifDiv.append(animeImage);
            $("#gif-display").prepend(gifDiv);
          }
        }
      });
  });


  // add new gif button
  $("#gif-submit").on("click", function(){
      event.preventDefault()
      var animeNew = $("#gif-input").val()
      //console.log(animeNew)

      var newBttn = $("<button>").text(animeNew)

      newBttn.attr("data-anime", animeNew)
      newBttn.attr("class", "gifBttn")

      $("#gif-buttons").append(newBttn)
  })


//start and pause gif 
$(document).on("click", ".gif", function() {
  //$(".gif").on("click", function() {
      console.log("clicked gif")
    var state = $(this).attr("data-state");
  
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



var office = ["Dwight", "Jim Halpert", "Pam Beesly", "Phyllis Vance", "Bob Vance"];

    //  trigger the AJAX Call
    $("#find-character").on("click", function(event) {

      
      event.preventDefault();

      // get the text
      var jim = $("#office-input").val();
      //empty the box
      $("#office-input").val("");
      office.push(jim.trim());
      renderButtons();
    });

  
    function renderButtons() {
    		$("#officeButtons").empty();
    		for (i=0; i<office.length; i++){
    			$("#officeButtons").prepend("<button class='add-character btn btn-primary' style='margin:10px;'>"+office[i]+"</button>");
    		}
    }

   $(document).on("click", ".add-character", getofficeInfoFromAPI);

   function getofficeInfoFromAPI(){
      		var officeInfo = "";
      		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="+ this.textContent;
      		 $.ajax({
        		url: queryURL, 
        		method:'GET'}).done(function(response){displayOfficeInfo(response);})
   }

   // display the first ones
    renderButtons();

    var myID = 0;
    function displayOfficeInfo(response){
       $("#office-view").empty();
       var imageArray = response.data;
       var myHTML = "";
       for (i = 0; i < imageArray.length; i++) {
         var rating = imageArray[i].rating;
         if(rating == "g" || rating == "pg13"){
            myHTML += "<div class='col-md-3'><p>Rating: "+rating+"</p><p><img animatedSrc = '"+imageArray[i].images.fixed_height_small.url+"' stillSrc = '"+imageArray[i].images.fixed_height_small_still.url+"'src='"+imageArray[i].images.fixed_height_small_still.url+"'></p></div>";
         }
       }

    	$("#office-view").append(myHTML);
    }

    $(document.body).on("click", "img", function() { 
        var isAnimated = $(this).attr("isAnimated");
        if(isAnimated==null || isAnimated=='' ){
          isAnimated =  "false";
        }

        if(isAnimated=="true"){
          $(this).attr("src",  $(this).attr("stillSrc") );
          $(this).attr("isAnimated", "false");

        } else {
          $(this).attr("src",  $(this).attr("animatedSrc") );
          $(this).attr("isAnimated", "true");
        }
    });
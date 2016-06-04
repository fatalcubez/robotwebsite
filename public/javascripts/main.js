$(function() {
    $(".convert-button").on("click", function(){
      var text = $(".convert-text").val();
      console.log(text)

      $.get("convert", {text: JSON.stringify(text)}, function (results) {
        if(results.text != null){
          $(".results").append(
            "<p class='result'>Text sucessfully convert: " + text + "</p>"  
          ).hide();
        }else{
          $(".results").append(
            "<p class='result'>Text unable to be converted: " + results.text + "</p>"
          ).hide();
        }
        $(".results").fadeIn(1000)
      });
    })
});
$(function() {
    var shouldClear = false;
    $(".convert-button").on("click", function(){
      var text = $(".convert-text").val();
      console.log(text)

      $.get("convert", {text: JSON.stringify(text)}, function (results) {
        if(results){
          $(".results").append(
            "<p class='result'>Text sucessfully convert: " + text + "</p>"  
          ).hide();
          shouldClear = true;
        }else{
          $(".results").append(
            "<p class='result'>Text unable to be converted: " + results.text + "</p>"
          ).hide();
          shouldClear = true;
        }
        $(".results").fadeIn(1000)
      });
    })
});
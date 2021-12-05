$(document).ready(function() {
    $(".textarea").keyup(function() {
        let charcount = $(this).val().length;
        $(".counter").text( 140 - charcount);
        if (charcount > 140) {
            $(".counter").css("color", "red")
        } else if (charcount === 0) { 
            $(".counter").css("color","#545149")
        } else {
            $(".counter").css("color", "blue")
        }
    })
})
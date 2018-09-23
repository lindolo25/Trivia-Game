var trivia = {
    correctAnswers: 0,
    incorretAnswers: 0,
    timer: undefined,
    init: function(){
        //$("#timer").hide();
        console.log("hide timer");

        $("#start-trivia").on("click", function(){ console.log("started"); });
    },
    restart: function(){

    }
}
var trivia = {
    correctAnswers: 0,
    incorretAnswers: 0,
    timer: undefined,
    init: function(){
        $("#timer").hide();
        console.log("hide timer");

        var startButton = $('<button>Click Here to Start.</button>');
        startButton.on("click", function(){ console.log("started"); });
        startButton.appendTo("#trivia-options");
    },
    restart: function(){

    }
}
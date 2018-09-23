var trivia = {
    questions: [
        {
            description: "Could you be able to respond this quesion?",
            correctAnswer: 1,
            answers: ["Answer 1","Answer 2","Answer 3","Answer 4"]
        },
        {
            description: "Could you be able to respond the second quesion?",
            correctAnswer: 3,
            answers: ["Answer 1","Answer 2","Answer 3","Answer 4"]
        }
    ],
    correctAnswers: 0,
    incorretAnswers: 0,
    unansweredQuestions: 0,
    currentQuestion: -1,
    timeCounter: undefined,
    interval: 0,
    init: function()
    {
        $("#timer").hide();
        console.log("hide timer");

        $("#start-trivia").on("click", function()
        { 
            console.log("started");
            trivia.popQuestion();
        });
    },
    popQuestion: function()
    {
        // increment current question ---------------------
        this.currentQuestion ++;
        console.log(this.currentQuestion);

        // check is there is any question remaining if not break ---
        if(this.currentQuestion >= this.questions.length)
        {
            return;
        }        

        // print the questions on screen ------------------
        var triviaOptions = $("#trivia-options");
        triviaOptions.html('<div class="col-12"><p id="description">'+ this.questions[this.currentQuestion].description +'</p></div>');

        for(i = 0; i < this.questions[this.currentQuestion].answers.length; i++)
        {
            var temp = $('<div class="col-12 col-sm-6 col-lg-4"><p class="option" data-index="'+ i +'">'+ this.questions[this.currentQuestion].answers[i] +'</p></div>');
            temp.children("p").on("click", function() { 
                var selected = $(this).attr("data-index");
                trivia.completeQuestion(selected); 
            });
            triviaOptions.append(temp);
        }

        // show and start timers --------------------------
        this.startTimer(60, function() { trivia.timeOut(); }, true);
    },
    startTimer(seconds, execute, show)
    {
        this.interval = seconds - 1;
        $("#timer").text(seconds);
        this.timeCounter = setInterval(function()
        { 
            $("#timer").text(trivia.interval--);
            if(trivia.interval === -1)
            {
                if(show) $("#timer").hide();
                clearInterval(trivia.timeCounter);                
                execute();
            }
        }, 1000);

        if(show) { 
            $("#timer").show();
        }
        else {
            $("#timer").hide();
        }
    },
    completeQuestion: function(selected)
    {
        console.log("question completed");
        clearInterval(this.timeCounter);
        this.computeResult(selected);
        this.startTimer(10, function() { trivia.popQuestion() }, true);
    },
    timeOut: function()
    {
        console.log("time's Out");
        this.computeResult(-1);
        this.startTimer(10, function() { trivia.popQuestion() }, true);
    },
    computeResult: function(selected)
    {
        console.log("computer selected: "+ selected);
        if()
    },
    restart: function()
    {

    }
}
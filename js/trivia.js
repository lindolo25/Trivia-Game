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
            this.computeResult();
            return;
        }        

        // print the questions on screen ------------------
        var triviaOptions = $("#trivia-options");
        triviaOptions.html('<div id="question-head" class="col-12"><p>'+ this.questions[this.currentQuestion].description +'</p></div>');

        for(i = 0; i < this.questions[this.currentQuestion].answers.length; i++)
        {
            var temp = $('<div class="col-12 col-sm-6"><p class="option" data-index="'+ i +'">'+ this.questions[this.currentQuestion].answers[i] +'</p></div>');
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
        this.computeQuestion(selected);
        this.startTimer(5, function() { trivia.popQuestion() }, false);
    },
    timeOut: function()
    {
        console.log("time's Out");
        this.computeQuestion(-1);
        this.startTimer(5, function() { trivia.popQuestion() }, false);
    },
    computeQuestion: function(selected)
    {
        selected = parseInt(selected);
        var title = "";
        console.log("computer selected: "+ selected);
        if(selected === -1)
        {
            title = "<h4 class=\"neutral\">Time's Up!</h4>";
            this.unansweredQuestions++;
        }
        else if(this.questions[this.currentQuestion].correctAnswer === selected)
        {
            title = "<h4 class=\"correct\">Correct !!!</h4>";
            this.correctAnswers++;
        }
        else
        {
            title = "<h4 class=\"incorrect\">Incorrect!</h4>";
            $(".option[data-index=\""+ selected +"\"]").removeClass("option").addClass("option-incorrect").off("click");
            this.incorretAnswers++;
        }
        $(".option[data-index=\""+ this.questions[this.currentQuestion].correctAnswer +"\"]").removeClass("option").addClass("option-correct").off("click");
        $(".option").removeClass("option").addClass("option-neutral").off("click");
        $("#question-head").prepend(title);
    },
    computeResult: function()
    {
        var result = $('<div class="col-12 col-sm-8 col-md-6">\
                <p>All done! This is how you did.</p>\
                <div><p class="option-neutral relative">Correct Answers: <span class="badge badge-success">'+ this.correctAnswers +'</span></p></div>\
                <div><p class="option-neutral relative">Incorrect Answers: <span class="badge badge-danger">'+ this.incorretAnswers +'</span></p></div>\
                <div><p class="option-neutral relative">Unswered Questions: <span class="badge badge-dark">'+ this.unansweredQuestions +'</span></p></div>\
            </div>\
            <div class="col-12">\
                <button id="restart-trivia" class="btn btn-secondary">Restart.</button>\
            </div>')
            
        result.find("#restart-trivia").on("click", function() { trivia.restart(); });
        $("#trivia-options").html(result);
    },
    restart: function()
    {
        this.correctAnswers = 0;
        this.incorretAnswers = 0;
        this.unansweredQuestions = 0;
        this.currentQuestion = -1;
        this.timeCounter = undefined;
        this.interval = 0;

        this.popQuestion();
    }
}
var trivia = {
    questions: [
        {
            description: "How many bits is a byte?",
            correctAnswer: 1,
            answers: ["4","8","16","32"]
        },
        {
            description: "WWW stands for?",
            correctAnswer: 1,
            answers: ["World Worm Web","World Wide Web","World Word Web","None of the above"]
        },
        {
            description: "A ________________ is a group of independent computers attached to one another through communication media.",
            correctAnswer: 2,
            answers: ["Internet","E-mail","Network","All of the above"]
        },
        {
            description: "Which of the following is a storage device?",
            correctAnswer: 3,
            answers: ["Hard Disk","USB Disk","Floppy Disk","All of the above"]
        },
        {
            description: "A segment of a track in a mass storage system?",
            correctAnswer: 2,
            answers: ["Pixel","Address","Sector","Flip-Flop"]
        },
        {
            description: "Which of the following bit patterns (represented in hexadecimal notation) represents a negative number in two’s complement notation?",
            correctAnswer: 0,
            answers: ["A6","55","7F","08"]
        },
        {
            description: "A means of encoding text in which each symbol is represented by 16 bits",
            correctAnswer: 2,
            answers: ["ISO","ASCII","Unicode","LZW"]
        },
        {
            description: "Collection of 1024 Bytes",
            correctAnswer: 1,
            answers: ["1MB","1KB","1TB","1GB"]
        },
        {
            description: ".JS extension refers usually to what kind of file?",
            correctAnswer: 3,
            answers: ["Image File","Animation/Movie File","Programing/Scripting Related File","Hipertext Related File"]
        },
        {
            description: "What does RAM stand for?",
            correctAnswer: 0,
            answers: ["Random Access Memory","Random Accelerator Module","Reserve Accelerated Memory","None of the above"]
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
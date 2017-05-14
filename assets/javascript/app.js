
// GLOBAL VARIABLES
//------------------------------------------------------------------------------

//trivia fyi
var questions = [
    ["Which of the traditional five senses are dolphins believed not to possess?", "sight", "smell", "hearing", "taste", "smell"],
    ["A flamboyance is a group of what animal?", "flamingos", "guinea pigs", "quails", "meerkats", "flamingos"],
    ["What is the proper term for a group of parrots?", "posse", "cloud", "pandemonium", "scuttle", "pandemonium"],
    ["What is the national animal of Scotland?", "lion", "dragon", "hedgehog", "unicorn", "unicorn"],
    ["How many hearts does an octopus have?", "1", "2", "3", "4", "3"],
    ["What is the sleepiest animal in the world, sleeping around 22 hours each day?", "sloth", "koala", "house cat", "whale", "koala"],
    ["Which animal has the longest tongue relative to its total size?", "chameleon", "whale", "frog", "aardvark", "chameleon"],
    ["How many pounds can a blue whale calf gain in a 24 hour period?", "20", "40", "100", "200", "200"]
];

var timeCounter = 15;
var questionCounter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;




//FUNCTIONS
//------------------------------------------------------------------------------

function openingScreen() {

	startBtn = $("<button>");
    startBtn.attr("type", "button");
    startBtn.addClass("btn btn-primary btn-lg btn-block start");
    startBtn.text("Click to Start!");
    $(".main").html(startBtn);
};


function displayQuestion() {

    $(".main").empty();

    question = questions[questionCounter][0];
    answer1 = questions[questionCounter][1];
    answer2 = questions[questionCounter][2];
    answer3 = questions[questionCounter][3];
    answer4 = questions[questionCounter][4];
    answerArray = [answer1, answer2, answer3, answer4];
    

    questionDisplay = '<h2>Time Remaining: <span class="timer"></span></h2>';
    questionDisplay += "<h2>" + question + "<h2>";

    $(".main").html(questionDisplay);

    for (var i=0; i<answerArray.length; i++) {
        var answerBtn = $("<button>");
        answerBtn.attr("type", "button");
        answerBtn.addClass("btn btn-primary btn-lg btn-block answer");
        answerBtn.text(answerArray[i]);

        $(".main").append(answerBtn)
    };

    timeCounter=15;
    countdown();
};

function countdown() {
	timer = setInterval(timerFunc, 1000);
	function timerFunc() {
		if (timeCounter === 0) {
			clearInterval(timer);
			timesUp();
		}
		if (timeCounter > 0) {
			timeCounter--;
		}
		$(".timer").html(timeCounter);
	}
};

function timesUp() {
    unanswered++;
    $(".main").empty();

    timesUpDisplay = "<h2>Time's up!</h2>"
    timesUpDisplay += "<h2>The correct answer was <strong>" + questions[questionCounter][5] + "</strong></h2>"
    $(".main").html(timesUpDisplay)

    if (questionCounter < questions.length-1) {
        setTimeout(displayQuestion, 3000);
        questionCounter++;
    }
        else {
            setTimeout(endGame, 3000);
        }

    
};

function displayCorrect() {
    correct++;
    $(".main").empty();

    correctDisplay = "<h2>Correct!</h2>";
    $(".main").html(correctDisplay);

    if (questionCounter < questions.length-1) {
        setTimeout(displayQuestion, 3000);
        questionCounter++;
    }
        else {
            setTimeout(endGame, 3000);
        }    
};

function displayIncorrect() {
    incorrect++;
    $(".main").empty();

    incorrectDisplay = "<h2>Yikes! You'll get the next one!</h2>";
    incorrectDisplay += "<h2>The correct answer was <strong>" + questions[questionCounter][5] + "</strong></h2>"
    $(".main").html(incorrectDisplay);

    if (questionCounter < questions.length-1) {
        setTimeout(displayQuestion, 3000);
        questionCounter++;
    }
        else {
            setTimeout(endGame, 3000);
        }    
};

function endGame() {
    $(".main").empty();
    
    showResults = "<h2>Correct: " + correct + "</h2>";
    showResults += "<h2>Incorrect: " + incorrect + "</h2>"
    showResults += "<h2>Unanswered: " + unanswered + "</h2></br>"
    $(".main").html(showResults);

	resetBtn = $("<button>");
    resetBtn.attr("type", "button");
    resetBtn.addClass("btn btn-primary btn-lg btn-block reset");
    resetBtn.text("Click to Play Again!");
    $(".main").append(resetBtn);

};

function reset() {
    timeCounter = 15;
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    openingScreen();
}


//MAIN PROCESS
//------------------------------------------------------------------------------

$(document).ready(function() {

openingScreen();

$(".start").on("click", function(event){
	event.preventDefault();  
	displayQuestion();
}); 

$(document).on("click", ".answer", function(event){
	event.preventDefault();  
	clearInterval(timer);
    var userAnswer = $(this).text();
    var correctAnswer = questions[questionCounter][5];

    if (userAnswer == correctAnswer) {
        displayCorrect();
    }
        else {
            displayIncorrect();
        }
});

$(document).on("click", ".reset", function(event){
	event.preventDefault();  
	reset();
});  


});


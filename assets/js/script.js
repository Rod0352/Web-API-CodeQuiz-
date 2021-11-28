// variables
let quizBody = document.getElementById("quiz");
let resultsEl = document.getElementById("result");
let finalScoreEl = document.getElementById("finalScore");
let gameoverDiv = document.getElementById("endGame");
let questionsEl = document.getElementById("questions");
let quizTimer = document.getElementById("timer");
let startQuizButton = document.getElementById("startbtn");
let startQuizDiv = document.getElementById("main");
let highscoreContainer = document.getElementById("highscoreContainer");
let highscoreDiv = document.getElementById("high-scorePage");
let highscoreInputName = document.getElementById("initials");
let highscoreDisplayName = document.getElementById("highscore-initials");
let endGameBtns = document.getElementById("endGameBtns");
let submitScoreBtn = document.getElementById("submitScore");
let highscoreDisplayScore = document.getElementById("highscore-view");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "What is 'Hoisting'? ",
    choiceA: "Lifting the Value of a Variable",
    choiceB: "Default behavior of your browser to load from top to bottom",
    choiceC: "A default behavior of moving declarations to the top of the code",
    choiceD: "None of these",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Onset Model",
    choiceD: "Desktop Open Mandate",
    correctAnswer: "a"},
   {
    question: "What is mainly used to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "JSON",
    choiceD: "Excel",
    correctAnswer: "b"},
    {
    question: "What is a Call-Back function?",
    choiceA: "A function that that loops through an Array",
    choiceB: "A type of psuedo code",
    choiceC: "Funcation to store Data locally",
    choiceD: "A function passed as an arguement to another Function",
    correctAnswer: "d"},
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// This cycles through the object array containing the quiz questions.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return displayScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the Time and quiz
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          displayScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function  displays your score after completing the quiz or when timer ends
function displayScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You answered " + score + " out of questions" + quizQuestions.length + " correctly!";
}

// Function highscore that saves and stringifies the array of high scores in local stoage then runs the function to show scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Please Enter Intitials!");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears the local storage of high scores 
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function restartQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks answer responses 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        displayScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);
//DOM
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

//INITIAL VARIABLES
let currentQuestions = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;

// DUMMY QUESTIONS ARRAY
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

//CONSTANTS

const correct_Bonus = 10; //Point for ever correctly answered question
const max_Questions = 3; //Max questions to ask in the quiz

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //Spread the questions array in the availableQuestions Array
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= max_Questions) {
    return window.location.assign("../pages/end.html")  // Send to end page
  }
  //Adds +1 to current question
  questionCounter++; 

  //Progress active question number 
  progressText.innerHTML = `Question: ${questionCounter} / ${max_Questions}`
  
  // Update Progress Bar
  progressBarFull.style.width = `${(questionCounter / max_Questions) * 100}%`
  
  //Logic to randomly select a question and display it on the DOM
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // Display the choices from each question.
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number]
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", event => {
    // console.log(event.targets)
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    console.log(selectedAnswer);
    console.log(selectedAnswer == currentQuestion.answer) //To check if the answer was correct

    // Ternanry Statement to apply the class depending on if the answer is correct or not.
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
    // If the answer is correct add to the bonus score.
    if (classToApply === "correct") {
      incrementScore(correct_Bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply); //Corectness Class applied here


    // Function which changes the question 1 second after the question is answer. 
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply); // Resets the class so the color and style is default
      getNewQuestion();
    }, 1000);
    
  });
});

// IF the answer is correct it adds the score to the DOM.
incrementScore = num => {
  score += num;
  scoreText.innerText = score; 
};


startQuiz();

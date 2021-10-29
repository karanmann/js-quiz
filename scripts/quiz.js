//DOM

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

//VARIABLES

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

const correct_Bonus = 10;
const max_Questions = 3;

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
  questionCounter++; //Adds +1 to current question
  questionCounterText.innerHTML = `${questionCounter} / ${max_Questions}`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

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

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
    if (classToApply === "correct") {
      incrementScore(correct_Bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply); // Resets the class so the color and style is default
      getNewQuestion();
    }, 1000);
    
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score; 
};

startQuiz();

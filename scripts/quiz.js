const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  //-------------------
      createBold()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  //-------------------
      document.getElementById("quizForm").innerHTML = ""
      score = 0
      document.getElementById ("Score").innerHTML = score
      totalNumberOfQuestions =questions.length
      createBolt()

}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  //-------------------
  if (correct) {
    score = score + 10
    document.getElementById ("Score").innerHTML = score
  }
  //---------------------
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    // score = score + 10
    // document.getElementById ("Score").innerHTML = score
    element.classList.add('correct')
    
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

//========================================================

function createBolt() {
  var el= document.getElementById("quizForm");
  for (let i=1 ; i <= totalNumberOfQuestions; i++) {
      // if (i !== totalNumberOfQuestions){
          el.innerHTML += `
                         <div class="col bolt" id="numberOfQuestion">
                              <div class="number" id="number${i}">${i}</div>
                              <div class="dash"></div>
                          </div>
                      `
      // }
      // else {
      // el.innerHTML += `
      //                    <div class="col" id="numberOfQuestion">
      //                         <div class="bolt">
      //                         <div class="number">${i}</div>
      //                         </div>
      //                     </div>
      //                 `
      // }
   }
   createBold()
}

function createBold() {
  for (let i=1 ; i <= totalNumberOfQuestions; i++) {
      var el = document.getElementById (`number${i}`)
      if ((currentQuestionIndex + 1) == el.innerHTML) {
          el.style.color = "black"
          el.style.transform = "scale(1.2 , 1.2)"
      }
      else {
          el.style.color = "rgb(91, 90, 90)"
          el.style.transform = "scale(1 , 1)"
      }
  }
}

//=======================================

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is 2 / 2?',
    answers: [
      { text: '0', correct: false },
      { text: '1', correct: true },
      { text: '2', correct: false },
      { text: '3', correct: false }
    ]
  },
  {
    question: 'What is 2 - 2?',
    answers: [
      { text: '1', correct: false },
      { text: '0', correct: true },
      { text: '4', correct: false },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]
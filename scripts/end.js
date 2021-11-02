const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// FIREBASE BACKEND INITIALISED TO SAVE HIGH SCORES

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8O46RuTnnTH9G2s-JBP8rRqgs6BSkm0E",
  authDomain: "quiz-app-backend.firebaseapp.com",
  projectId: "quiz-app-backend",
  storageBucket: "quiz-app-backend.appspot.com",
  messagingSenderId: "886683991893",
  appId: "1:886683991893:web:17e5d9318d6558cfd3b9dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app)

/// FIREBASE INITIALISATION ENDS HERE


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (event) => {
  event.preventDefault();
  
  // firebase.database().ref('userdata').set({
  //   username: username.value,
  //   score: mostRecentScore
  // })

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};

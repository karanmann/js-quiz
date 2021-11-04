import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

//Add your own config content
const firebaseConfig = {
  apiKey: "AIzaSyBDHrkjwHn0onuOk9eeMzEWaRNCFeGk_vc",
  authDomain: "quiz-game-js.firebaseapp.com",
  projectId: "quiz-game-js",
  storageBucket: "quiz-game-js.appspot.com",
  messagingSenderId: "566798874679",
  appId: "1:566798874679:web:72e2dad84def68d127e7b2",
  measurementId: "G-XX3XJ3193S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Add to firebase
async function addReview() {
  var review = readInput("review");
  var name = readInput("name");
  var email = readInput("email");

  if (!name || !email || !review) return null;
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      review: review,
      name: name,
      email: email,
    });
    clearInput("review");
    clearInput("name");
    clearInput("email");
    displayReviewsInList("listOfReviews");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//Get all from firebase
async function getReviews() {
  const reviews = await getDocs(collection(db, "reviews"));
  return reviews;
}

function readInput(id) {
  if (!document.getElementById(id) && !document.getElementById(id).value)
    return null;

  return document.getElementById(id).value;
}

function clearContentOfElement(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).innerHTML = "";
}

function formatListItem(item) {
  return `<li class="reviews-card">
            <p>${item.review}</p> 
            <p>${item.name}</p>
            <p>${item.email}</p>
          </li>`;
}

function clearInput(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).value = "";
}

function addReviewToList(list, item) {
  if (!document.getElementById(list)) return null;
  document.getElementById(list).innerHTML += formatListItem(item);
}

function addEventListener() {
  if (!document.getElementById("addReview")) return null;
  document.getElementById("addReview").removeEventListener("click", addReview);
  document.getElementById("addReview").addEventListener("click", addReview);
}

async function displayReviewsInList(id) {
  var reviewsInDb = await getReviews();
  clearContentOfElement(id);

  reviewsInDb.forEach((doc) => {
    addReviewToList("listOfReviews", {
      id: doc.id,
      review: doc.data().review,
      name: doc.data().name,
      email: doc.data().email,
    });
  });

  addEventListener();
  return;
}

async function init() {
  await displayReviewsInList("listOfReviews");
  addEventListener();
}

init();

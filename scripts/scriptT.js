var totalNumberOfQuestions = 10;
var questionNumber = 8;

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
        if (questionNumber == el.innerHTML) {
            el.style.color = "black"
            el.style.transform = "scale(1.2 , 1.2)"
        }
        else {
            el.style.color = "rgb(91, 90, 90)"
            el.style.transform = "scale(1 , 1)"
        }
    }
}

createBolt()
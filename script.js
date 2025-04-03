let StartQuiz = document.querySelector("#btn");
let container = document.querySelector("#container");
let btnBox = document.querySelector("#btnBox");
let timerbox = document.querySelector("#timerbox");
let scores = document.querySelector("#score");
let option_value = document.querySelector("#option_value");
let ChangeBtn = document.querySelector("#ChangeBtn");
let right = document.querySelector(".right");
let wrong = document.querySelector(".wrong");

let timer = 5;
let score = 0;
let gameinterval;
let i = 0; 
let arr = [
    { q: "12+8", a: 20, option: [10, 20, 26, 30] },
    { q: "25-7", a: 18, option: [12, 16, 18, 20] },
    { q: "6*4", a: 24, option: [22, 26, 24, 20] },
    { q: "36/6", a: 6, option: [2, 4, 6, 8] },
    { q: "90-55", a: 35, option: [25, 30, 35, 45] },
    { q: "13*7", a: 91, option: [76, 91, 45, 86] }
];

StartQuiz.addEventListener("click", () => {
    StartQuiz.style.display = "none";
    timerbox.style.display = "block";
    wrong.style.display = "block";
    right.style.display = "block";
    ChangeBtn.style.display = "block";

    i = 0;
    score = 0; 
    scores.innerText = `Score: ${score}`;
    scores.style.display = "none"; 

    gamestart();
    displayQuestion(i);

    let interval = setInterval(() => {
        // i++;
        if (i < arr.length) {
            displayQuestion(i);
        } else {
            clearInterval(interval);
            endGame();
        }
    }, 6000);
});

ChangeBtn.addEventListener("click", () => {
    timer = 5;
    timerbox.innerText = timer;
    gamestart();
    i++
    displayQuestion(i);
});

function displayQuestion(index) {
    if (index >= arr.length) {
        endGame();
        return;
    }

    container.innerText = arr[index].q;
    btnBox.innerHTML = "";

    let box = document.createElement("div");
    box.classList.add("object-box");

    arr[index].option.forEach(opt => {
        let btn = document.createElement("button");
        btn.classList.add("optBtn");
        btn.innerText = opt;

        btn.addEventListener("click", () => {
            if (opt === arr[index].a) {
                score += 1;
                btn.classList.add("writeAnswer");
                scores.innerText = `Score: ${score}`;
            } else {
                btn.classList.add("error-changes");
                
            }
        });

        box.appendChild(btn);
    });

    btnBox.appendChild(box);
}

function gamestart() {
    clearInterval(gameinterval); 
    timerbox.innerText = timer;

    gameinterval = setInterval(() => {
        if (timer === 0) {
            clearInterval(gameinterval);
            i++;
            if (i < arr.length-1) {
                timer = 5;
                gamestart();
                displayQuestion(i);
            } else {
                endGame();
            }
        } else {
            timerbox.innerText = --timer;
            
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameinterval);
    option_value.style.display = "none";
    scores.innerHTML = `You have Scored ${score} Out of ${arr.length}`;
    scores.style.display = "block";
    btnBox.innerHTML = ""; 
   
}

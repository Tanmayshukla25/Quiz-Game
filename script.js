let StartQuiz = document.querySelector("#btn");
let container = document.querySelector("#container");
let btnBox = document.querySelector("#btnBox");
let timerbox = document.querySelector("#timerbox");
let scores = document.querySelector("#score");
let option_value = document.querySelector("#option_value");

let timer=10;
let score=0;
let gameinterval;
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
    timerbox.style.display="block"
    gamestart()
    let i = 0;
    displayQuestion(i);

    let interval = setInterval(() => {
        i++;
        if (i < arr.length) {
            displayQuestion(i);
        } else {
            clearInterval(interval);
        }
    }, 2000);
});


function displayQuestion(i) {
    container.innerText = arr[i].q;

    
    btnBox.innerHTML = "";

    let box = document.createElement("div");
    box.classList.add("object-box");
    arr[i].option.forEach(opt => {
        let btn = document.createElement("button");
        btn.classList.add("optBtn");
        
        btn.innerText = opt;

     
        btn.addEventListener("click", () => {
            if (opt === arr[i].a) {
                score +=1
                console.log(score);
            
            } else {
                btn.classList.add("error-changes")
            }
        });

        box.appendChild(btn);
    });

    btnBox.appendChild(box);
}

function gamestart(){
    timerbox.innerText=timer;
 gameinterval=setInterval(()=>{
     

        if(timer===0){
            clearInterval(gameinterval)
            endGame();  
        }
        else{
            timerbox.innerText=--timer;
        }
    },1000)

}

function endGame(){
    option_value.style.display="none";
    scores.innerHTML= `You have Scored ${score} Out of ${arr.length}`;
    scores.style.display="block";

}

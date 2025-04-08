let StartQuiz = document.querySelector("#btn");
let container = document.querySelector("#container");
let btnBox = document.querySelector("#btnBox");
let timerbox = document.querySelector("#timerbox");
let scores = document.querySelector("#score");
let option_value = document.querySelector("#option_value");
let ChangeBtn = document.querySelector("#ChangeBtn");
let copyData = document.querySelector("#copyData");
let btnboard = document.querySelector("#btnboard");
let right = document.querySelector(".right");
let Inputbox = document.querySelector("#Inputbox");
let wrong = document.querySelector(".wrong");
let header = document.querySelector("#header");

const data =   localStorage.getItem("data") !== null
? JSON.parse(localStorage.getItem("data")) : [];
const form = document.querySelector("form");
const input = document.querySelector("input");


let timer = 5;
let score = 0;
let gameinterval;
let i = 0; 


let obj = {};
let arr = [
    { q: "12+8", a: 20, option: [10, 20, 26, 30] },
    { q: "25-7", a: 18, option: [12, 16, 18, 20] },
    { q: "6*4", a: 24, option: [22, 26, 24, 20] },
    { q: "36/6", a: 6, option: [2, 4, 6, 8] },
    { q: "90-55", a: 35, option: [25, 30, 35, 45] },
    { q: "13*7", a: 91, option: [76, 91, 45, 86] }
];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    obj = { name: value, date: new Date().toLocaleString(), score: 0 };

  
    
    data.push(obj);
    
    localStorage.setItem("data", JSON.stringify(data));
    input.value = "";
 

    StartQuiz.style.display = "none";
    Inputbox.style.display = "none";
    timerbox.style.display = "block";
    wrong.style.display = "block";
    right.style.display = "block";
    ChangeBtn.style.display = "block";
    option_value.style.display = "block";
    copyData.style.display = "none";

    i = 0;
    score = 0; 
    scores.innerText = `Score: ${score}`;
    scores.style.display = "none"; 

    gamestart();
    displayQuestion(i);

    let interval = setInterval(() => {
        
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
            let allButtons = document.querySelectorAll(".optBtn");
            allButtons.forEach(button => button.disabled = true);

            if (opt === arr[index].a) {
                score += 1;
                obj.score=score;

                btn.classList.add("writeAnswer");
                storeScoreInLS(score) 
                scores.innerText = `Score: ${score}`;
            }
             else {
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
    i=0;
    setTimeout(() => {
        scores.style.display = "none";
        Inputbox.style.display = "block";
        StartQuiz.style.display = "block";
       
    }, 5000);
    
   
}
  
  function storeScoreInLS(score) {
    const dataArr = JSON.parse(localStorage.getItem("data"));
    dataArr[dataArr.length - 1].score = score;
    localStorage.setItem("data", JSON.stringify(dataArr));
  }


  header.addEventListener("click",()=>{
    Inputbox.style.display = "block";
    StartQuiz.style.display = "block";
    option_value.style.display = "none";
  })

  btnboard.addEventListener("click", () => {
    let CopyLocalDATA = JSON.parse(localStorage.getItem("data"));
    copyData.innerHTML = "";
    copyData.style.display = "block";

    CopyLocalDATA.sort((a, b) => b.score - a.score);
  
    let table = document.createElement("table");
    table.style.color="black"
    table.style.fontSize="20px"
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
  
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
  
    let headers = ["Name", "Date", "Score"];
    headers.forEach(text => {
      let th = document.createElement("th");
      th.innerText = text;
      th.style.border = "1px solid black";
      th.style.padding = "8px";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
  
    let tbody = document.createElement("tbody");
    tbody.style.color="black"
    tbody.style.fontSize="20px"
    CopyLocalDATA.forEach(val => {
      let dataRow = document.createElement("tr");
  
      let cell1 = document.createElement("td");
      cell1.innerText = val.name;
      cell1.style.border = "1px solid black";
      cell1.style.padding = "8px";
  
      let cell2 = document.createElement("td");
      cell2.innerText = val.date;
      cell2.style.border = "1px solid black";
      cell2.style.padding = "8px";
  
      let cell3 = document.createElement("td");
      cell3.innerText = val.score;
      cell3.style.border = "1px solid black";
      cell3.style.padding = "8px";
  
      dataRow.append(cell1, cell2, cell3);
      tbody.appendChild(dataRow);
    });
  
    table.append(thead, tbody);
    copyData.appendChild(table);
  });


  window.addEventListener("load",()=>{
    localStorage.clear();
  })  
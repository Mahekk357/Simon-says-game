 let gameSeq=[];
 let userSeq=[];  
 let scores=[];
 let started = false; 
 let level = 0; 

 let btns = ["yellow", "red", "purple", "green"]; 

 let h2 = document.querySelector("h2"); 
 let h3 = document.querySelector("h3"); 
 

document.addEventListener("keypress", function(){
   if(started == false){
    console.log("game has started"); 
    started = true; 
    levelUp();
   }
}  )

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash"); 
    }, 250); 
}


function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash"); 
    }, 250); 
}

function levelUp(){
    userSeq =[];
    level++; 
    h2.innerText = `Level ${level}`; 
    //random button choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx]; 
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor); 
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]=== gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; 
        setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white"; 
        }, 200);
        reset(); 

    }
}

function btnPress() {
    let btn = this; 
    userFlash(btn);
    userColor = btn.getAttribute("id"); 
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);

}

let allBtns = document.querySelectorAll(".btn"); 

for(btn of allBtns){
    btn.addEventListener("click", btnPress); 
}

function reset(){
    started = false; 
    gameSeq =[]; 
    userSeq=[]; 
    scores.push(level); 
    getHighScore(); 
    level = 0; 
}

function getHighScore() { 
    let highScore = scores.reduce((initial, currentScore) => {
        // If the currentValue is greater than the accumulator, update the accumulator
        if (currentScore > initial) {
          return currentScore;
        } else {
          // Otherwise, keep the current accumulator value
          return initial;
        }
      }, scores[0]);
      h3.innerHTML = `High score: <b>${highScore}</b>`; 
}
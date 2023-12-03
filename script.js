// it will hold timer count 
let timerCount = 0;
let timersId =[];
const stopSound = document.getElementById("timer-end");

const currentTimerSection = document.getElementById("currentTimers");
const set_timer_btn = document.getElementById("timeSet_button");
const displayTimeCart = document.getElementById("displayTimeCart")
let hh = document.getElementById("hr");
let mm = document.getElementById("min");
let ss = document.getElementById("sec");

let inputFocus = document.getElementById("")

set_timer_btn.addEventListener("click",(e) =>
{setTimerFunction();}
);
timer0Function();
function timer0Function(){
    let noTimer = document.createElement('h5');
    if(timerCount == 0){
        
        noTimer.id = "noTimer";
        noTimer.innerText ="You have no timers currently!"
        currentTimerSection.appendChild(noTimer);
    }
    if(timerCount == 1){
       let removeElement = document.getElementById("noTimer");
       removeElement.remove(); 
    }
    
}

function setTimerFunction(){
    timerCount++; // increase timer count when set button clicked
    timer0Function();
    createdisplaycart();
   
}


function createdisplaycart(){
    
    const hours = parseInt(hh.value) || 0;
    const minutes = parseInt(mm.value) || 0;
    const seconds = parseInt(ss.value) || 0;
     let totalTimeInSec = hours * 3600 + minutes * 60 + seconds;

    let cartDiv = document.createElement('div');
    cartDiv.id =timercart;
    cartDiv.id = "timer"+timerCount;
    cartDiv.className = "dTime";
    displayTimeCart.appendChild(cartDiv);

    timersId.push("timer"+timerCount);

    let timeLeft = document.createElement('h4');
    timeLeft.innerText="Time Left :"
    cartDiv.appendChild(timeLeft);

    let timeDisplay = document.createElement('div');
    timeDisplay.id = "time_display1";
    cartDiv.appendChild(timeDisplay);


    let p = document.createElement("p");
    p.textContent = formatTime(hours, minutes, seconds);
    timeDisplay.appendChild(p);


    let deleteBtn = document.createElement('button');
    deleteBtn.id ="timeDel_button";
    deleteBtn.innerHTML ="Delete"
    cartDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', ()=> {
        cartDiv.remove(cartDiv,timeDisplay,deleteBtn);
        clearInterval(intervalId);
        timerCount--;
        timer0Function();
    });

    const intervalId = setInterval( ()=> {
        if(totalTimeInSec > 0){
            totalTimeInSec--;

            // update the timer text 
            p.textContent = formatTime(
                Math.floor(totalTimeInSec / 3600),
                Math.floor((totalTimeInSec % 3600) / 60),
                totalTimeInSec % 60
            );
        } else {
            // Timer has reached 0
            clearInterval(intervalId);
            cartDiv.classList.add("isFinished");
            timeLeft.textContent = "";
            p.textContent = "Timer is Up !";
            deleteBtn.textContent = "Stop";
            // When timer is of play sound 
            stopSound.play();   
        }
    },1000);
}
function formatTime(hours,minutes,seconds) {
    return (
        padZero(hours) +' '+' '+':' +' '+' '+
        padZero(minutes) +' '+' '+':'+' '+' '+
        padZero(seconds)
    );
}
function padZero(num){
    return num < 10 ? '0' + num : num;
}
let min = 1,
    max = 10;
    winningNum =  getRandomNumber(min, max);
    guessesLeft = 3;

// UI elements
const gamebox = document.getElementById('box');
const minNum = document.querySelector('#minNum');
const maxNum = document.querySelector('#maxNum');
const guessInputField = document.querySelector('#GUessNumberfield');
const guessBtn = document.querySelector('#guessBtn');
const message = document.querySelector('#message');
 
// Assign UI min & max

minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
gamebox.addEventListener('mousedown' ,function(e){
    if(e.target.classList.contains('play-again')){
        window.location.reload()
    } 
})

guessBtn.addEventListener('click',function(){
   let guess =  parseInt(guessInputField.value);

   //validate

   if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Enter a number between ${min} & ${max}`,'red');
   } 

   // check if won

   if(guess === winningNum){ 

    gameOver(true,`You're correct! the winning number is ${winningNum},color`)

   }else{
    // Wrong number

    //subtract chances
    guessesLeft-=1;

    if(guessesLeft === 0){
        // Game over Lost
        guessInputField.disabled = true;
        gameOver(false,`Game Over! You Lost | The correct answer was ${winningNum}`);
    }else{
        // Game continues - answer wrong
        // change border color
        guessInputField.style.borderColor = 'red';
        guessInputField.value = '';
        setMessage(`${guess} is not correct , ${guessesLeft} guesses left`,'red'); 
    } 
   } 
})
// Game Over

function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInputField.style.borderColor = color;
    guessInputField.disabled = true;
    message.style.color = color;  
    guessInputField.style.color = color;
    setMessage(msg);  

    // play  again?
    guessBtn.value = 'Play again';
    guessBtn.className += ' play-again'
}

// set message function
function setMessage(msg,color){
    guessInputField.style.color = color;
    message.style.color = color;
    message.textContent = msg;
} 

// getRandom Number

function getRandomNumber(min , max){
    return  Math.floor(Math.random() * (max - min + 1) + min); 
}


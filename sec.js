const container = document.querySelector('.container');
const questionbox = document.querySelector('.question');
const choicesbox = document.querySelector('.choices');
const nextbtn = document.querySelector('.nextbtn');
const scorecard = document.querySelector('.scorecard');
const timer = document.querySelector('.timer');


const quiz=[
    {
        question:"Q.Which of the following is not a CSS box model property ?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
    {
        question:"Q.Which of the following is not a valid way to declare a function in Javascript?",
        choices:["function myFunction(){};","let myFunction = function(){};","myFunction:function(){};","const myFunction =()=>{};"],
        answer:"const myFunction =()=>{};"
    },
    {
        question:"Q.Which is the  purpose of the keyword in Javascript ?",
        choices:["It refers to the current function","It refers to the current object","It refers to the parent object","It refers to the parent function"],
        answer:"It refers to the current object"
    },
    {
        question:"Q.Which of the following is not a Javascript data type?",
        choices:["string","boolean","object","float"],
        answer:"string"
    },
];
let currentQuestionIndex = 0;
let score = 0;
let quizOver =false;
let timeleft =15;
let timerID =null;
let textContent;
const showQuestions = () =>{
   const questionDetails =quiz[currentQuestionIndex];
   questionbox.textContent = questionDetails.question;
   
   choicesbox.textContent ="";
   for(let i=0; i<questionDetails.choices.length; i++){
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add ('choice');
    choicesbox.appendChild(choiceDiv);
    choiceDiv.addEventListener('click',() =>{
        if(choiceDiv.classList.contains('selected')){
            choiceDiv.classList.remove('selected');
        }
        else{
            choiceDiv.classList.add('selected');
        }

    });
   }
   if(currentQuestionIndex < quiz.length){
    startTimer();
   }
}
// check answer
const checkAnswer = () =>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        alert('correct Answer');
        score++;
    }
    else{
        alert('wrong Answer');
    }
    timeleft =15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stoptimer();
        timer.style.display ="none";
    }
}
//function to start timer
const startTimer =()=>{
    clearInterval(timerID);
    timer.textContent = timeleft;
    const countDown =() =>{
        timeleft--;
        timer.textContent = timeleft;
        if(timeleft === 0){
            const confirmUser = confirm("Time Up");
            if(confirmUser){
                timeleft=15;
                startQuiz();
            }
            else{
                startbtn.style.display="block";
                container.style.display ="none";
                return;
            }
        }
    }
   timerID= setInterval(countDown,1000);
}
const stoptimer =() =>{
    clearInterval(timerID);
}
const startQuiz = () =>{
    timeleft =15;
    timer.style.display ="flex";
    showQuestions();
}
// show score.
const showScore = () =>{
    questionbox.textContent ="";
    choicesbox.textContent="";
    scorecard.textContent =`you scored ${score} out of ${quiz.length}`;
    nextbtn.textContent ="play Again";
    nextbtn.addEventListener('click',() =>{
        currentQuestionIndex = 0;
        showQuestions();
        nextbtn.textContent ="next";
        scorecard.textContent ="";
    });

}
showQuestions();
nextbtn.addEventListener('click',() =>{
   checkAnswer();
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextbtn.textContent ==="NEXT"){
        alert("select your answer");
        return;
    }
    else{
        checkAnswer();
    } 
});

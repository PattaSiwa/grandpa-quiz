//using the question instances to populate the HTML mark up in the main content
//grabbing all the elements that need to be changed, append-to and create

const questionDom = document.querySelector('#question')
const picContainer = document.querySelector('.pictureContainer')
const picture = document.createElement('img')
const answers = document.querySelectorAll('.answer')
const userFeedback = document.querySelector('.feedback')
const endModal = document.querySelector('#endModal')
const quizContainer = document.querySelector('.quizContainer')
const yourScore = document.querySelector('#yourScore')

//game object

const quizGame = {
    questionSet: {},
    randQuestions: [],
    currentQuestion: {},
    numberOfQuestion: 0,
    currentScore: 100,
    totalScore: 0
}

//Putting all the functions in one place 


//create a function that will populate the page by passing in the question object
const quizDisplay = (quest) => {
    //make the answers
    quest.makeAnswerKeys()
    //update the question on screen
    questionDom.textContent = quest.question
    //set the picture to the src
    picture.setAttribute('src', quest.img)
    //append the picture to the picture container
    picContainer.appendChild(picture)
    //shuffle the arrays before displaying

    //if it's a multiple choice with 4 options run this
    if (quest.answers.length === 4) {
        const shuffledAnswer = shuffleArray(quest.answers)
        let i = 0
        for (let answer of answers) {
            answer.textContent = shuffledAnswer[i]
            i++
        }
        //if its a true or false then only show two buttons that say true or false
    } else if (quest.answers.length === 2) {
        answers[0].textContent = 'True'
        answers[1].textContent = 'False'
        answers[2].style.display = 'none'
        answers[3].style.display = 'none'
    }


}


//this is a Fisher-Yates algorithm to shuffle arrays when needed

const shuffleArray = function (array) {
    const copy = array.slice();
    let result = [];
    while (copy.length > 0) {
        const randomIndex = Math.floor(Math.random() * copy.length)
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }
    return result;
};

//starting the quiz
//set the game object up by grabbing 10 questions to put in the array and displaying the first question

const startQuiz = () => {
    quizContainer.style.display = 'block'
    //shuffling the 15 questions and grabbing the first 10 
    const shuffledQuestions = shuffleArray(quizGame.questionSet.questionsArray)
    for (let quest of shuffledQuestions) {
        quizGame.randQuestions.push(quest)
    }
    quizGame.currentQuestion = quizGame.randQuestions[quizGame.numberOfQuestion]
    quizDisplay(quizGame.currentQuestion)
}


//Game interface


//if the answer is correct then we can move on to the next question. 
const correctAnswer = () => {
    userFeedback.innerText = 'เลือกคำตอบด้านล่าง'
    quizGame.numberOfQuestion++
    quizGame.currentQuestion = quizGame.randQuestions[quizGame.numberOfQuestion]
    //reset all the buttons
    for (let answer of answers) {
        answer.removeAttribute('disabled')
        answer.style.display = 'inline-block'
    }
    quizDisplay(quizGame.currentQuestion)

}

const disableAnswers = () => {
    for (let answer of answers) {
        answer.setAttribute('disabled', 'true')
    }
}

//check if the answer is correct then call correct
const checkAnswer = (event) => {
    if (event.target.textContent === quizGame.currentQuestion.correctAnswer) {

        //give currentScore แต้ม to the totalScore and let user know how much they got
        quizGame.totalScore += quizGame.currentScore
        userFeedback.innerText = "ถูกต้องที่คุณได้รับ" + ` ${quizGame.currentScore} แต้ม!`
        //turn off the answer key
        disableAnswers()
        //update scoreboard
        yourScore.textContent = `คุณมี: ${quizGame.totalScore} แต้ม`

        //check if the game is over
        if (quizGame.numberOfQuestion === quizGame.randQuestions.length - 1) {
            setTimeout(() => {
                endModal.style.display = 'block';
                quizContainer.style.display = 'none';
                document.querySelector('#score').textContent = quizGame.totalScore + " แต้ม!"
            }, 2000)

        } else {

            //update currentScore back to 100
            quizGame.currentScore = 100
            //wait 2 seconds then call correctAnswer for next question
            setTimeout(correctAnswer, 2000)

        }

    } else { // this happens when answer is incorrect


        userFeedback.innerText = 'ลองอีกครั้งไม่ถูกต้อง'
        //turn the button off after you guessed wrong answer
        event.target.setAttribute('disabled', 'true')

        //minus 75 แต้ม for true or false 
        //minus 25 แต้ม each time the user answered incorrectly
        if (quizGame.currentQuestion.correctAnswer === 'True' || quizGame.currentQuestion.correctAnswer === 'False') {
            quizGame.currentScore -= 75
        } else {
            quizGame.currentScore -= 25
        }


    }
}

// Add event listeners on each answer buttons and then run checkAnswer when they're clicked.
for (let answer of answers) {
    answer.addEventListener('click', checkAnswer)
}


const restartGameStat = () => {
    quizGame.numberOfQuestion = 0
    quizGame.randQuestions = []
    quizGame.currentQuestion = {}
    quizGame.currentScore = 100
    quizGame.totalScore = 0
    userFeedback.innerText = "เลือกคำตอบด้านล่าง"
    for (let answer of answers) {
        answer.removeAttribute('disabled')
        answer.style.display = 'inline-block'
    }
    yourScore.textContent = "คะแนนของคุณ:"
}


const restartQuiz = () => {
    restartGameStat()
    startQuiz()
}


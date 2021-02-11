//These modals are the control flow of the game

//Start Modal
const startbtn = document.querySelector('#startGame')

startbtn.addEventListener('click', () => {
    document.querySelector('#startModal').style.display = 'none'
    quizGame.questionSet = familyQuestions
    startQuiz()

})



//endModal 
const retakeBtn = document.querySelector('#retakeQuiz')

retakeBtn.addEventListener('click', () => {
    document.querySelector('#endModal').style.display = 'none'
    restartQuiz()
})






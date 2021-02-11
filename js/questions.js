//template for questions using Class/ extends Class
//each question should take in the question, image and the correct answer



class Question {
    //will take in the 3 arguments to create a question class. 1) the question itself 2) the corresponding image that's in the img folder(prefixed) 3) the correct answer to the question.
    constructor(question, img, correctAnswer) {
        this.question = question
        this.img = `img/` + img
        this.correctAnswer = correctAnswer
        this.answers = [correctAnswer]
    }

    //populate the answers using possible answers

    makeAnswerKeys() {
        //randomize the answer key
        const newAnswers = shuffleArray(quizGame.questionSet.possibleAnswers)

        newAnswers.forEach((answer) => {
            //if it's less than 4 items in the array and it's not the same as the correct answer, then push it to the array
            if (this.answers.length < 4) {
                if (answer !== this.correctAnswer) {
                    this.answers.push(answer)
                }
            }

        })
    }

}

//true or false questions will be an extension of the Question class

class TrueOrFalse extends Question {
    constructor(question, img, correctAnswer) {
        super(question, img, correctAnswer)
        this.answers = []
    }

    makeAnswerKeys() {
        if (this.answers.length < 2) {
            this.answers.push('True')
            this.answers.push('False')
        }
    }

}

class QuestionType2 extends Question {
    constructor(question, img, correctAnswer, wrong1, wrong2, wrong3) {
        super(question, img, correctAnswer)
        this.answers = [correctAnswer, wrong1, wrong2, wrong3]
    }

    makeAnswerKeys() {
        //doesn't have to do anything 
    }
}

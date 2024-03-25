const questions = [
    {
        question: "Qual é o maior animal do mundo?", 
        answers: [
            {text: "Tubarão", correct: false},
            {text: "Baleia azul", correct: true},
            {text: "Elefante", correct: false},
            {text: "Girafa", correct: false},
        ]
    },
    {
        question: "De quem é a famosa frase 'Penso, logo existo'?", 
        answers: [
            {text: "Platão", correct: false},
            {text: "Galileu Galilei", correct: false},
            {text: "Descartes", correct: true},
            {text: "Francis Bacon", correct: false},
        ]
    },
    {
        question: "De onde é a invenção do chuveiro elétrico?", 
        answers: [
            {text: "Brasil", correct: true},
            {text: "Inglaterra", correct: false},
            {text: "França", correct: false},
            {text: "Austrália", correct: false},
        ]
    },
    {
        question: "Qual o menor e o maior país o mundo?", 
        answers: [
            {text: "Vaticano e Rússia", correct: true},
            {text: "Nauru e China", correct: false},
            {text: "Mônaco e Canadá", correct: false},
            {text: "São Marino e ìndia", correct: false},
        ]
    },
    {
        question: "Qual o nome do presidente do Brasil que ficou conhecido como Jango?", 
        answers: [
            {text: "Jânio Quadros", correct: false},
            {text: "Jacinto Anjos", correct: false},
            {text: "Getúlio Vargas", correct: false},
            {text: "João Goullart", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} questões!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
// COS110 OOP STUDY WEBSITE - QUIZ SYSTEM

class QuizSystem {
    constructor(topicName, questions) {
        this.topicName = topicName;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
        this.quizActive = false;
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.score = 0;
        this.quizActive = true;
        
        const modal = document.getElementById('quizModal');
        if (modal) {
            modal.classList.add('show');
            this.displayQuestion(0);
        }
    }

    displayQuestion(index) {
        if (index < 0 || index >= this.questions.length) {
            this.endQuiz();
            return;
        }

        this.currentQuestionIndex = index;
        const question = this.questions[index];
        const modal = document.getElementById('quizModal');
        
        if (!modal) return;

        const progress = modal.querySelector('.quiz-progress');
        if (progress) {
            progress.innerHTML = `Question <span id="currentQuestion">${index + 1}</span> of ${this.questions.length}`;
        }

        const questionsContainer = modal.querySelector('.quiz-questions-container');
        if (!questionsContainer) return;

        let questionHTML = `
            <div class="quiz-question" id="question-${index}">
                <div class="quiz-question-number">Question ${index + 1} of ${this.questions.length}</div>
                <div class="quiz-question-text">${question.question}</div>
        `;

        switch (question.type) {
            case 'multiple-choice':
                questionHTML += this.renderMultipleChoice(question, index);
                break;
            case 'true-false':
                questionHTML += this.renderTrueFalse(question, index);
                break;
            case 'fill-in':
                questionHTML += this.renderFillIn(question, index);
                break;
            case 'short-answer':
                questionHTML += this.renderShortAnswer(question, index);
                break;
        }

        questionHTML += `
                <div class="quiz-button-group">
                    <button class="btn btn-submit" onclick="window.quizSystem.submitAnswer(${index})">Submit Answer</button>
                    <button class="btn btn-skip" onclick="window.quizSystem.nextQuestion()">Skip</button>
                </div>
            </div>
        `;

        questionsContainer.innerHTML = questionHTML;
    }

    renderMultipleChoice(question, index) {
        let html = '';
        question.options.forEach((option, i) => {
            const letter = String.fromCharCode(65 + i);
            html += `
                <div class="quiz-option">
                    <input type="radio" name="q${index}" value="${letter}" id="q${index}_${letter}">
                    <label for="q${index}_${letter}">${option}</label>
                </div>
            `;
        });
        return html;
    }

    renderTrueFalse(question, index) {
        return `
            <div class="quiz-option">
                <input type="radio" name="q${index}" value="true" id="q${index}_true">
                <label for="q${index}_true">True</label>
            </div>
            <div class="quiz-option">
                <input type="radio" name="q${index}" value="false" id="q${index}_false">
                <label for="q${index}_false">False</label>
            </div>
        `;
    }

    renderFillIn(question, index) {
        return `
            <div style="background: #f0f0f0; padding: 15px; border-radius: 4px; margin: 15px 0; font-family: 'Courier New', monospace;">
                ${question.context}
            </div>
            <input type="text" class="fill-in-input" id="q${index}_answer" placeholder="Type your answer">
            <div class="fill-in-hint">${question.hint || 'Enter the code or value'}</div>
        `;
    }

    renderShortAnswer(question, index) {
        return `
            <textarea class="fill-in-input" id="q${index}_answer" placeholder="Type your answer" style="min-height: 100px;"></textarea>
            <div class="fill-in-hint">Brief explanation or code snippet</div>
        `;
    }

    submitAnswer(index) {
        const question = this.questions[index];
        let answer = null;

        if (question.type === 'multiple-choice' || question.type === 'true-false') {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            answer = selected ? selected.value : null;
        } else {
            const input = document.getElementById(`q${index}_answer`);
            answer = input ? input.value.trim() : null;
        }

        if (!answer) {
            alert('Please select or enter an answer');
            return;
        }

        this.answers[index] = answer;

        if (question.type === 'multiple-choice' || question.type === 'true-false') {
            if (answer === question.correctAnswer) {
                this.score++;
            }
        }

        this.nextQuestion();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.displayQuestion(this.currentQuestionIndex + 1);
        } else {
            this.endQuiz();
        }
    }

    endQuiz() {
        const modal = document.getElementById('quizModal');
        if (!modal) return;

        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let resultHTML = `
            <div class="quiz-final-score">
                <h2>🎉 Quiz Complete!</h2>
                <div class="quiz-final-score-number">${this.score}/${this.questions.length}</div>
                <div class="quiz-final-score-percentage">${percentage}%</div>
            </div>
            <div style="margin-top: 30px; display: flex; gap: 10px;">
                <button class="btn btn-primary" onclick="window.quizSystem.startQuiz()">Retake Quiz</button>
                <button class="btn btn-skip" onclick="window.quizSystem.closeQuiz()">Close Quiz</button>
            </div>
        `;

        const questionsContainer = modal.querySelector('.quiz-questions-container');
        if (questionsContainer) {
            questionsContainer.innerHTML = resultHTML;
        }

        this.quizActive = false;
    }

    closeQuiz() {
        const modal = document.getElementById('quizModal');
        if (modal) {
            modal.classList.remove('show');
        }
        this.quizActive = false;
    }
}

function openQuizModal() {
    if (!window.quizSystem) {
        alert('Quiz not loaded');
        return;
    }
    window.quizSystem.startQuiz();
}

function closeQuizModal() {
    if (window.quizSystem) {
        window.quizSystem.closeQuiz();
    }
}

window.QuizSystem = QuizSystem;
window.openQuizModal = openQuizModal;
window.closeQuizModal = closeQuizModal;

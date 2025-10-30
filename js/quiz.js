// COS110 OOP STUDY WEBSITE - QUIZ SYSTEM

class QuizSystem {
    constructor(topicName, questions) {
        this.topicName = topicName;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
        this.quizActive = false;
        this.revealed = new Array(questions.length).fill(false);
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.score = 0;
        this.revealed = new Array(this.questions.length).fill(false);
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
                    <button class="btn btn-skip" onclick="window.quizSystem.nextQuestion()">Skip Question</button>
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
        let isCorrect = false;

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
            isCorrect = answer === question.correctAnswer;
            if (isCorrect) {
                this.score++;
            }
        }

        this.showRevealAnswer(index, isCorrect);
    }

    showRevealAnswer(index, isCorrect) {
        const question = this.questions[index];
        const questionDiv = document.getElementById(`question-${index}`);
        
        if (!questionDiv) return;

        let revealHTML = `
            <div class="quiz-answer-reveal" style="margin-top: 20px; padding: 20px; border-radius: 8px; background: ${isCorrect ? '#e8f5e9' : '#ffebee'}; border-left: 5px solid ${isCorrect ? '#4caf50' : '#f44336'};">
                <div style="font-weight: bold; color: ${isCorrect ? '#2e7d32' : '#c62828'}; margin-bottom: 15px; font-size: 18px;">
                    ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </div>
        `;

        if (question.type === 'multiple-choice' || question.type === 'true-false') {
            revealHTML += `
                <div style="margin-bottom: 15px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 4px;">
                    <strong>Correct Answer:</strong> ${this.getAnswerLabel(question, question.correctAnswer)}
                </div>
                <div style="margin-bottom: 15px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 4px;">
                    <strong>Your Answer:</strong> ${this.getAnswerLabel(question, this.answers[index])}
                </div>
            `;
        }

        revealHTML += `
            <div style="background: rgba(0,0,0,0.1); padding: 15px; border-radius: 4px; line-height: 1.8; margin-bottom: 15px;">
                <strong style="font-size: 16px; display: block; margin-bottom: 10px;">Explanation:</strong>
                <div>${question.explanation}</div>
            </div>
        `;

        if (question.detailedExplanation) {
            revealHTML += `
                <div style="background: rgba(102, 126, 234, 0.1); padding: 15px; border-radius: 4px; line-height: 1.8; border-left: 3px solid #667eea;">
                    <strong style="font-size: 16px; display: block; margin-bottom: 10px; color: #667eea;">📖 Deep Dive:</strong>
                    <div>${question.detailedExplanation}</div>
                </div>
            `;
        }

        revealHTML += `
            </div>
            <div class="quiz-button-group" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.quizSystem.nextQuestion()">Next Question</button>
                <button class="btn btn-skip" onclick="window.quizSystem.skipToEnd()">End Quiz</button>
            </div>
        `;

        questionDiv.innerHTML += revealHTML;

        const submitBtn = questionDiv.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }
    }

    getAnswerLabel(question, value) {
        if (question.type === 'multiple-choice') {
            const index = value.charCodeAt(0) - 65;
            return `${value}) ${question.options[index] || 'Unknown'}`;
        } else if (question.type === 'true-false') {
            return value === 'true' ? 'True' : 'False';
        }
        return value;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.displayQuestion(this.currentQuestionIndex + 1);
        } else {
            this.endQuiz();
        }
    }

    skipToEnd() {
        this.endQuiz();
    }

    endQuiz() {
        const modal = document.getElementById('quizModal');
        if (!modal) return;

        const percentage = Math.round((this.score / this.questions.length) * 100);
        let feedback = '';
        let emoji = '';
        
        if (percentage === 100) {
            feedback = 'Perfect score! You have mastered this topic! 🌟';
            emoji = '🏆';
        } else if (percentage >= 80) {
            feedback = 'Excellent work! You have a strong understanding. 🎉';
            emoji = '👏';
        } else if (percentage >= 60) {
            feedback = 'Good job! Review the questions you missed for deeper understanding. 👍';
            emoji = '📚';
        } else if (percentage >= 40) {
            feedback = 'Keep studying! This topic needs more review. Consider re-reading the explanations. 💪';
            emoji = '🎯';
        } else {
            feedback = 'This is the beginning of your learning journey. Study the deep dives and try again! 🚀';
            emoji = '🌱';
        }
        
        let resultHTML = `
            <div class="quiz-final-score">
                <h2>${emoji} Quiz Complete!</h2>
                <div class="quiz-final-score-number">${this.score}/${this.questions.length}</div>
                <div class="quiz-final-score-percentage">${percentage}%</div>
                <div style="margin-top: 30px; font-size: 16px; color: var(--text-dark); line-height: 1.6;">
                    ${feedback}
                </div>
            </div>
            <div style="margin-top: 40px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
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
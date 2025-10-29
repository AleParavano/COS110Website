# COS110 OOP Study Website

A comprehensive interactive study website for learning Object-Oriented Programming in C++98.

## 📦 Files You Have

```
Your Project/
├── index.html (HOME PAGE)
├── css/
│   └── style.css (STYLESHEET)
├── js/
│   ├── main.js (UTILITIES)
│   ├── compiler.js (CODE EXECUTION)
│   └── quiz.js (QUIZ SYSTEM)
└── topics/
    ├── 01-pointers/
    ├── 02-classes/
    ├── 03-copy-constructors/
    ├── 04-assignment-operator/
    ├── 05-operator-overloading/
    ├── 06-exception-handling/
    ├── 07-inheritance/
    ├── 08-polymorphism/
    ├── 09-templates/
    └── 10-data-structures/
```

## 🚀 Quick Start

### Step 1: Set Up Folder Structure
Create the following folders in your project:
```
js/
css/
topics/01-pointers/
topics/02-classes/
topics/03-copy-constructors/
topics/04-assignment-operator/
topics/05-operator-overloading/
topics/06-exception-handling/
topics/07-inheritance/
topics/08-polymorphism/
topics/09-templates/
topics/10-data-structures/
```

### Step 2: Place Files
- `index.html` → Root directory
- `style.css` → `css/` folder
- `main.js`, `compiler.js`, `quiz.js` → `js/` folder

### Step 3: View Locally
Open `index.html` in any web browser to see the home page.

## ✨ Features

### Code Compiler
- Run C++98 code directly in browser
- Uses JDoodle API (200 compilations/day free)
- See output instantly
- Error handling included

### Quiz System
- Multiple choice questions
- True/False questions
- Fill-in-the-answer questions
- Short answer questions
- Instant feedback
- Score calculation

### Navigation
- Responsive sidebar
- Search functionality
- Mobile-friendly design
- Smooth scrolling

## 📝 Creating Topic Pages

### Basic Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Topic Name - COS110</title>
    <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
    <nav class="navbar">
        <a href="../../index.html" class="navbar-brand">📚 COS110 OOP</a>
    </nav>

    <div class="container">
        <aside class="sidebar">
            <!-- Navigation links -->
        </aside>

        <main class="main-content">
            <h1>Topic Name</h1>

            <!-- EXPLANATION SECTION -->
            <section class="section">
                <div class="section-title">📚 Explanation</div>
                <div class="explanation">
                    <!-- Your content here -->
                </div>
            </section>

            <!-- CODE EXAMPLES -->
            <section class="section">
                <div class="section-title">💻 Code Examples</div>
                <div class="code-example">
                    <div class="code-tabs">
                        <button class="code-tab active" data-tab="simple">Simple Snippet</button>
                        <button class="code-tab" data-tab="full">Full Program</button>
                    </div>
                    
                    <div data-tab-content="simple" class="code-editor">
// Simple example
int main() {
    return 0;
}
                    </div>

                    <div data-tab-content="full" style="display: none;">
                        <textarea class="code-editor" id="code1">#include <iostream>
using namespace std;

int main() {
    return 0;
}
                        </textarea>
                    </div>

                    <div class="code-buttons">
                        <button class="btn btn-primary" onclick="runCode(document.getElementById('code1'), document.getElementById('output1'))">▶ Run Code</button>
                        <button class="btn btn-secondary" onclick="downloadCode(document.getElementById('code1').value)">⬇ Download</button>
                    </div>

                    <div class="output-box" id="output1">Click "Run Code" to execute...</div>
                </div>
            </section>

            <!-- ACTIVITIES -->
            <section class="section">
                <div class="section-title">✍️ Coding Activities</div>
                <div class="activity">
                    <div class="activity-title">⚡ Intermediate Challenge</div>
                    <p>Challenge description...</p>
                    <button class="btn btn-secondary">⬇ Download Skeleton</button>
                    <button class="collapsible">▼ Show Solution</button>
                    <div class="collapsible-content">
                        <div class="code-editor">
// Solution code
                        </div>
                    </div>
                </div>
            </section>

            <!-- QUIZ -->
            <section class="section">
                <div class="section-title">📝 Quiz</div>
                <div class="quiz-container">
                    <p>Test your knowledge with questions on this topic.</p>
                    <button class="quiz-btn" onclick="initializeQuiz()">▶ Start Quiz</button>
                </div>
            </section>
        </main>
    </div>

    <footer>
        <p>Last Updated: November 2025</p>
    </footer>

    <script src="../../js/main.js"></script>
    <script src="../../js/compiler.js"></script>
    <script src="../../js/quiz.js"></script>
    
    <script>
        function initializeQuiz() {
            const questions = [
                {
                    type: 'multiple-choice',
                    question: 'Question 1?',
                    options: ['A', 'B', 'C', 'D'],
                    correctAnswer: 'A',
                    explanation: 'Explanation'
                }
                // Add more questions
            ];

            window.quizSystem = new QuizSystem('Topic Name', questions);
            openQuizModal();
        }

        // Create quiz modal
        if (!document.getElementById('quizModal')) {
            const modal = document.createElement('div');
            modal.id = 'quizModal';
            modal.className = 'quiz-modal';
            modal.innerHTML = `
                <div class="quiz-modal-content">
                    <div class="quiz-header">
                        <div>
                            <div class="quiz-question-number">Quiz</div>
                            <div class="quiz-progress">Question 1 of 20</div>
                        </div>
                        <button class="quiz-close" onclick="closeQuizModal()">✕</button>
                    </div>
                    <div class="quiz-questions-container"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    </script>
</body>
</html>
```

## 🌐 Deploy to GitHub Pages

### 1. Create GitHub Repository
```bash
git init
git add .
git commit -m "COS110 Study Website"
git remote add origin https://github.com/YOUR_USERNAME/cos110-study-website.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages"
3. Select "main" branch
4. Your site is live at: `https://YOUR_USERNAME.github.io/cos110-study-website/`

## 📋 Content Checklist

For each topic page, ensure:
- ✓ 300-800 word explanation
- ✓ 2-4 visual diagrams
- ✓ 10+ code examples
- ✓ Simple snippet (5-15 lines)
- ✓ Full runnable program
- ✓ 1 Intermediate activity
- ✓ 1 Advanced activity
- ✓ 20 quiz questions

## 💡 Tips

- Keep explanations clear and concise
- Test code examples before adding
- Make quizzes comprehensive
- Use visual diagrams where helpful
- Keep file sizes small for fast loading

## 🔧 API Integration

The JDoodle API is already configured in `compiler.js`. Free tier includes:
- 200 compilations per day
- C++98 support
- Instant code execution

No additional setup needed!

## 📞 Support

All code is well-commented and includes:
- Complete documentation
- Code examples
- Template structure
- Working features

## ✅ What Works

✓ Home page - Fully functional
✓ Navigation - All links ready
✓ Code compiler - JDoodle API active
✓ Quiz system - All 4 question types
✓ Responsive design - Mobile optimized
✓ Professional styling - Modern theme

## 🎓 Next Steps

1. Copy the provided template for each topic page
2. Fill in your content from PowerPoints
3. Test code examples
4. Create quizzes
5. Deploy to GitHub Pages

Ready to build amazing study materials! 🚀

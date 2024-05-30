// تعريف مصفوفة لتخزين الأسئلة
const quizData = [];
// تحديد عناصر HTML للعرض والتفاعل
const quiz = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const addQuestionForm = document.getElementById('add-question-form');
// تعريف المتغيرات اللازمة لتتبع حالة الاختبار
let currentQuiz = 0;
let score = 0;
let answeredQuestions = 0;

// إضافة مستمع لأحداث النموذج لإضافة سؤال جديد
addQuestionForm.addEventListener('submit', addQuestion);
// إضافة مستمع لأحداث الزر للانتقال للسؤال التالي
nextBtn.addEventListener('click', loadNextQuestion);
// إضافة مستمع لأحداث الزر لبدء الاختبار
startQuizBtn.addEventListener('click', startQuiz);

// دالة لإضافة سؤال جديد إلى المصفوفة
function addQuestion(event) {
    event.preventDefault(); // منع إرسال النموذج الافتراضي
    let newQuestion = document.getElementById('new-question').value.trim();
    let newAnswerA = document.getElementById('new-answer-a').value.trim();
    let newAnswerB = document.getElementById('new-answer-b').value.trim();
    let newAnswerC = document.getElementById('new-answer-c').value.trim();
    let newAnswerD = document.getElementById('new-answer-d').value.trim();
    let newCorrectAnswer = document.getElementById('new-correct-answer').value.trim();

    // التحقق مما إذا كان المستخدم قد قام بإدخال شيء ما في الحقول
    if (!newQuestion) {
        alert("Please enter the question.");
        return;
    }
    if (!newAnswerA) {
        alert("Please enter answer A.");
        return;
    }
    if (!newAnswerB) {
        alert("Please enter answer B.");
        return;
    }
    if (!newAnswerC) {
        alert("Please enter answer C.");
        return;
    }
    if (!newAnswerD) {
        alert("Please enter answer D.");
        return;
    }
    if (!newCorrectAnswer) {
        alert("Please enter the correct answer.");
        return;
    }

    // إنشاء كائن للسؤال الجديد
    const newQuizData = {
        question: newQuestion,
        a: newAnswerA,
        b: newAnswerB,
        c: newAnswerC,
        d: newAnswerD,
        correct: newCorrectAnswer
    };

    // إضافة السؤال الجديد إلى مصفوفة الأسئلة
    quizData.push(newQuizData);
    addQuestionForm.reset(); // إعادة تعيين النموذج
    alert('Question added successfully');

    // عرض زر بدء الاختبار إذا كان هناك أسئلة
    if (quizData.length > 0) {
        startQuizBtn.style.display = 'inline-block';
    }
}

// دالة لبدء الاختبار
function startQuiz() {
    currentQuiz = 0; // إعادة تعيين مؤشر السؤال الحالي
    score = 0; // إعادة تعيين النقاط
    answeredQuestions = 0; // إعادة تعيين عدد الأسئلة المجابة
    addQuestionForm.style.display = 'none'; // إخفاء نموذج إضافة الأسئلة
    startQuizBtn.style.display = 'none'; // إخفاء زر بدء الاختبار
    nextBtn.style.display = 'inline-block'; // عرض زر السؤال التالي
    loadQuiz(); // تحميل السؤال الأول
}

// دالة لتحميل وعرض السؤال الحالي
function loadQuiz() {
    // التحقق إذا كانت هناك أسئلة في المصفوفة
    if (quizData.length === 0) {
        quiz.innerHTML = '<h2>No questions available yet</h2>';
        nextBtn.style.display = 'none'; // إخفاء زر السؤال التالي إذا لم توجد أسئلة
        return;
    }

    const currentQuizData = quizData[currentQuiz];
    // عرض السؤال الحالي وخيارات الإجابة
    quiz.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <label>
            <input type="radio" name="answer" value="a"> ${currentQuizData.a}
        </label><br>
        <label>
            <input type="radio" name="answer" value="b"> ${currentQuizData.b}
        </label><br>
        <label>
            <input type="radio" name="answer" value="c"> ${currentQuizData.c}
        </label><br>
        <label>
            <input type="radio" name="answer" value="d"> ${currentQuizData.d}
        </label>
    `;
}

// دالة لتحميل السؤال التالي والتحقق من الإجابة
function loadNextQuestion() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    // التحقق من الإجابة المختارة من المستخدم
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.value;
        }
    });

    // التحقق إذا اختار المستخدم إجابة
    if (selectedAnswer) {
        // التحقق من صحة الإجابة وزيادة النقاط إذا كانت صحيحة
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }
        answeredQuestions++; // زيادة عدد الأسئلة المجابة
        currentQuiz++; // الانتقال إلى السؤال التالي
        // تحميل السؤال التالي أو عرض النتائج إذا انتهى الاختبار
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    } else {
        alert('Please choose an answer before moving on to the next question');
    }
}

// دالة لعرض النتائج النهائية
function showResults() {
    quiz.innerHTML = `
        <h2>You have answered ${score} out of ${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
    `;
    nextBtn.style.display = 'none'; // إخفاء زر السؤال التالي
}

// دالة لإخفاء زر بدء الاختبار عند تحميل الصفحة إذا لم تكن هناك أسئلة
window.onload = function() {
    if (quizData.length === 0) {
        startQuizBtn.style.display = 'none';
    }
};
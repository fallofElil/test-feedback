//global
var feedbacks = [];

var feedback = {
    id: null,
    question_1: null,
    question_2: null,
    question_3: [],
    question_4: [],
    question_5: [],
    question_6: null,
    question_7: null
}

var pages = document.querySelectorAll('.page');
var pageId = 0;

var questions = document.querySelectorAll('.question');
var qstnId = 0;

var formQuest = document.forms.questionnaire;

function radioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

//home page
var btnStart = document.querySelector('#btn_start');

btnStart.onclick = function() {
    pages[pageId].classList.toggle('page--active');
    pages[pageId + 1].classList.toggle('page--active');

    questions[qstnId].classList.toggle('question--active');
}

//question 1
var userNameInput = formQuest.elements.user_name;
var submitQ1 = document.querySelector('#submitQ1');

userNameInput.oninput = function() {
    if (userNameInput.value.length >= 3) {
        submitQ1.removeAttribute('disabled');
    }
}

submitQ1.onclick = function() {
    feedback.question_1 = userNameInput.value;

    questions[qstnId].classList.toggle('question--active');
    questions[qstnId + 1].classList.toggle('question--active');
}

//question 2
document.querySelector('#submitQ2').onclick = function() {
    var radios = document.querySelectorAll('fieldset[name="question2"] input[type="radio"]');
    feedback.question_2 = radioValue(radios);
}

//question6
flatpickr("#q6_calendar", {
    minDate: "today"
});

//dev elements
var testBtn = document.querySelector('#btn_test');

testBtn.onclick = function() {
    console.log(feedback);
}
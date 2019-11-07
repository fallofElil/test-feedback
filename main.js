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

function nextQuestion(n) {
    questions[qstnId].classList.toggle('question--active');
    qstnId += n;
    questions[qstnId].classList.toggle('question--active');
}

function radioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function checkedValue(cbs) {
    var checked = [];
    for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].checked) {
            checked.push(cbs[i].value);
        }
    }
    return checked;
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
    nextQuestion(1);
}

//question 2
document.querySelector('#submitQ2').onclick = function() {
    var radios = document.querySelectorAll('fieldset[name="question2"] input[type="radio"]');
    feedback.question_2 = radioValue(radios);
    console.log('question 2 value: ' + feedback.question_2);
    if (feedback.question_2.toString() == 'yes') {
        nextQuestion(1);
    } else {
        nextQuestion(2);
    }
}

//question 3
document.querySelector('#submitQ3').onclick = function() {
    var cbs = document.querySelectorAll('fieldset[name="question3"] input[type="checkbox"]');
    Array.prototype.push.apply(feedback.question_3, checkedValue(cbs));
    nextQuestion(2);
}

//question 4
document.querySelector('#submitQ4').onclick = function() {
    var cbs = document.querySelectorAll('fieldset[name="question4"] input[type="checkbox"]');
    Array.prototype.push.apply(feedback.question_4, checkedValue(cbs));
    nextQuestion(1);
}

//question 5
var newDishes = [];
var submitQ5 = document.querySelector('#submitQ5');
document.querySelector('#q5_btn_add').onclick = function() {
    var inputField = document.querySelector('#q5_input');
    newDishes.push(inputField.value);
    inputField.value = '';
    if (newDishes.length >= 3) {
        submitQ5.removeAttribute('disabled');
    }
    
}

submitQ5.onclick = function() {
    Array.prototype.push.apply(feedback.question_5, newDishes);
    nextQuestion(1);
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
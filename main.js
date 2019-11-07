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

function Feedback(q1, q2, q3, q4, q5, q6, q7) {
    this.id = `u${(+new Date).toString(16)}`;
    this.question_1 = q1;
    this.question_2 = q2;
    this.question_3 = q3;
    this.question_4 = q4;
    this.question_5 = q5;
    this.question_6 = q6;
    this.question_7 = q7;
    this.date = new Date();
}

var pages = document.querySelectorAll('.page');
var pageId = 0;

var questions = document.querySelectorAll('.question');
var qstnId = 0;

var formQuest = document.forms.questionnaire;

function nextPage(n) {
    pages[pageId].classList.toggle('page--active');
    pageId += n;
    pages[pageId].classList.toggle('page--active');
}

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
    nextPage(1);
    questions[qstnId].classList.toggle('question--active');
}

//question 1
var q1Value = null;
var userNameInput = formQuest.elements.user_name;
var submitQ1 = document.querySelector('#submitQ1');

userNameInput.oninput = function() {
    if (this.value.length >= 3) {
        submitQ1.removeAttribute('disabled');
    }
}

submitQ1.onclick = function() {
    q1Value = userNameInput.value;
    nextQuestion(1);
}

//question 2
var q2Value = null;
document.querySelector('#submitQ2').onclick = function() {
    var radios = document.querySelectorAll('fieldset[name="question2"] input[type="radio"]');
    q2Value = radioValue(radios);
    if (q2Value.toString() == 'yes') {
        nextQuestion(1);
    } else {
        nextQuestion(2);
    }
}

//question 3
var q3Value = [];
document.querySelector('#submitQ3').onclick = function() {
    var cbs = document.querySelectorAll('fieldset[name="question3"] input[type="checkbox"]');
    Array.prototype.push.apply(q3Value, checkedValue(cbs));
    nextQuestion(2);
}

//question 4
var q4Value = [];
document.querySelector('#submitQ4').onclick = function() {
    var cbs = document.querySelectorAll('fieldset[name="question4"] input[type="checkbox"]');
    Array.prototype.push.apply(q4Value, checkedValue(cbs));
    nextQuestion(1);
}

//question 5
var q5Value = [];
var q5Input = document.querySelector('#q5_input');
var q5BtnAdd = document.querySelector('#q5_btn_add');
var submitQ5 = document.querySelector('#submitQ5');
var q5List = document.querySelector('#q5_list');

var newDishes = [];

q5Input.oninput = function() {
    if (this.value.length >= 3) {
        q5BtnAdd.removeAttribute('disabled');
    } 
}

q5BtnAdd.onclick = function() {
    q5List.innerHTML += `<li>${q5Input.value}<button>X</button></li>`;
    q5Input.value = '';
    this.setAttribute('disabled', 'disabled');

    var liElements = q5List.querySelectorAll('li');
    
    for (var i = 0; i < liElements.length; i++) {
        liElements[i].querySelector('button').onclick = function() {
            this.parentElement.remove();

            if (q5List.querySelectorAll('li').length < 3) {
                submitQ5.setAttribute('disabled', 'disabled');
            }
        }
    }

    if (liElements.length >= 3) {
        submitQ5.removeAttribute('disabled');
    }
}

submitQ5.onclick = function() {
    var liElements = q5List.querySelectorAll('li');
    for (var i = 0; i < liElements.length; i++) {
        newDishes.push(liElements[i].innerText);
    }
    Array.prototype.push.apply(q5Value, newDishes);
    nextQuestion(1);
}

//question6
var q6Value = null;
flatpickr("#q6_calendar", {
    maxDate: "today"
});

document.querySelector('#submitQ6').onclick = function() {
    q6Value = document.querySelector('#q6_calendar').value;
    nextQuestion(1);
}

//end of questions
var userFeedback
var q7Value = null;
document.querySelector('#btn_finish').onclick = function() {
    q7Value = document.querySelector('#q7_textarea').value;
    userFeedback = new Feedback(q1Value, q2Value, q3Value, q4Value, q5Value, q6Value, q7Value);
    feedbacks.push(userFeedback);
    nextPage(1);
}

//dev elements
var testBtn = document.querySelector('#btn_test');

testBtn.onclick = function() {
    console.log(userFeedback);
}
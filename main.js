var feedbacks = [];

var feedback = {
    id: undefined,
    question_1: undefined,
    question_2: undefined,
    question_3: [],
    question_4: [],
    question_5: [],
    question_6: undefined,
    question_7: undefined
}

var pages = document.querySelectorAll('.page');
var pageId = 0;

//home page
var btnStart = document.querySelector('#btn_start');

btnStart.onclick = function() {
    pages[pageId].classList.toggle('page--active');
    pages[pageId + 1].classList.toggle('page--active');
}

//question 1
var formQ1 = document.forms.question1;
var userNameInput = formQ1.elements.user_name;

userNameInput.oninput = function() {
    if (userNameInput.value.length >= 3) {
        document.querySelector('#submitQ1').removeAttribute('disabled');
    }
}

//dev elements
var testBtn = document.querySelector('#btn_test');

testBtn.onclick = function() {
    console.log(feedback);
}
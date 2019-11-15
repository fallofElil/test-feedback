//global

const feedbacks = [];

function Feedback(q1, q2, q3, q4, q5, q6, q7) {
    this.id = `u${(+new Date).toString(16)}`;
    this.question_1 = q1;
    this.question_2 = q2;
    this.question_3 = [];
    Array.prototype.push.apply(this.question_3, q3);
    this.question_4 = [];
    Array.prototype.push.apply(this.question_4, q4);
    this.question_5 = [];
    Array.prototype.push.apply(this.question_5, q5);
    this.question_6 = q6;
    this.question_7 = q7;
    this.date = new Date();
}

const pages = document.querySelectorAll('.page');
let pageId = 0;

const questions = document.querySelectorAll('.question');
let qstnId = 0;

const formQuest = document.forms.questionnaire;

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
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function checkedValue(cbs) {
    const checked = [];
    for (let i = 0; i < cbs.length; i++) {
        if (cbs[i].checked) {
            checked.push(cbs[i].value);
        }
    }
    return checked;
}

//home page
const btnStart = document.querySelector('#btn_start');

btnStart.onclick = function() {
    nextPage(1);
    questions[qstnId].classList.toggle('question--active');
}

//question 1
let q1Value = null;
const userNameInput = formQuest.elements.user_name;
const submitQ1 = document.querySelector('#submitQ1');

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
let q2Value = null;
document.querySelector('#submitQ2').onclick = function() {
    const radios = document.querySelectorAll('fieldset[name="question2"] input[type="radio"]');
    q2Value = radioValue(radios);
    if (q2Value.toString() == 'Да') {
        nextQuestion(1);
    } else {
        nextQuestion(2);
    }
}

//question 3
let q3Value = [];
document.querySelector('#submitQ3').onclick = function() {
    const cbs = document.querySelectorAll('fieldset[name="question3"] input[type="checkbox"]');
    Array.prototype.push.apply(q3Value, checkedValue(cbs));
    nextQuestion(2);
}

//question 4
let q4Value = [];
document.querySelector('#submitQ4').onclick = function() {
    const cbs = document.querySelectorAll('fieldset[name="question4"] input[type="checkbox"]');
    Array.prototype.push.apply(q4Value, checkedValue(cbs));
    nextQuestion(1);
}

//question 5
let q5Value = [];
const q5Input = document.querySelector('#q5_input');
const q5BtnAdd = document.querySelector('#q5_btn_add');
const submitQ5 = document.querySelector('#submitQ5');
const q5List = document.querySelector('#q5_list');

let newDishes = [];

q5Input.oninput = function() {
    if (this.value.length >= 3) {
        q5BtnAdd.removeAttribute('disabled');
    } 
}

q5BtnAdd.onclick = function() {
    q5List.innerHTML += `<li>${q5Input.value}<button class="list_btn-del"></button></li>`;
    q5Input.value = '';
    this.setAttribute('disabled', 'disabled');

    const liElements = q5List.querySelectorAll('li');
    
    for (let i = 0; i < liElements.length; i++) {
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
    const liElements = q5List.querySelectorAll('li');
    for (let i = 0; i < liElements.length; i++) {
        newDishes.push(liElements[i].innerText);
    }
    for (let i = 0; i < liElements.length; i++) {
        liElements[i].remove();
    }
    Array.prototype.push.apply(q5Value, newDishes);
    for (let i = 0; i < newDishes.length; i++) {
        newDishes.pop();
    }
    nextQuestion(1);
}

//question6
let q6Value = null;
flatpickr("#q6_calendar", {
    maxDate: "today"
});

document.querySelector('#submitQ6').onclick = function() {
    q6Value = document.querySelector('#q6_calendar').value;
    nextQuestion(1);
}

//end of questions
function setDefaultValue() {
    q1Value = null;
    q2Value = null;
    q3Value.length = 0;
    q4Value.length = 0;
    q5Value.length = 0;
    q6Value = null;
    q7Value = null;
}

let q7Value = null;
document.querySelector('#btn_finish').onclick = function() {
    q7Value = document.querySelector('#q7_textarea').value;
    const userFeedback = new Feedback(q1Value, q2Value, q3Value, q4Value, q5Value, q6Value, q7Value);
    feedbacks.push(userFeedback);
    formQuest.reset();
    setDefaultValue();
    nextPage(1);
    questions[qstnId].classList.toggle('question--active');
}

document.querySelector('#btn_retry').onclick = function() {
    nextPage(-2);
    qstnId = 0;

    const results = document.querySelector('#result_tables');
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

//result table
function generateTable(table, element) {
    let counter = 1;
    for (key in element) {
        if (key != 'id' && key != 'date') {
            let row = table.insertRow();
            let th = document.createElement('th');
            let thText = document.createTextNode(counter);
            th.appendChild(thText);
            row.appendChild(th);
            counter += 1;
            let cell = row.insertCell();
            let tdText = document.createTextNode(element[key]);
            cell.appendChild(tdText);
        }
    }
}

document.querySelector('#btn_results').onclick = function() {
    const resultTables = document.querySelector('#result_tables');

    for (let element of feedbacks) {
        const resultTable = document.createElement('table');
        resultTable.classList.add('table-result');
        generateTable(resultTable, element);
        resultTables.appendChild(resultTable);
    }
}

//dev elements
const testBtn = document.querySelector('#btn_test');
const btnLikeInfo = document.querySelector('#btn_like_info');

testBtn.onclick = function() {
    console.log('page num: ' + pageId);
    console.log('question id: ' + qstnId);
    console.log('array: ' + feedbacks + ' | length: ' + feedbacks.length);

    for (let i = 0; i < feedbacks.length; i++) {
        console.log('element id: ' + feedbacks[i]);
        for (let prop in feedbacks[i]) {
            console.log('obj[' + i + ']' + prop + ' = ' + feedbacks[i][prop]);
            if (Array.isArray(feedbacks[i][prop])) {
                for (let j = 0; j < feedbacks[i][prop].length; j++) {
                    console.log('property ' + prop + 'el[' + j + '] = ' + feedbacks[i][prop][j]);
                }
            }
        }
    }
}

btnLikeInfo.onclick =  function() {
    console.log('current num of elements in var q3: ' + q3Value.length);
    console.log('current num of elements in var q5: ' + q5Value.length);

    let checked = 0;
    for (let i = 0; i < document.querySelectorAll('fieldset[name="question3"] input[type="checkbox"]').length; i++) {
        if (document.querySelectorAll('fieldset[name="question3"] input[type="checkbox"]')[i].checked) {
            checked += 1;
        }
    }
    console.log('checked fields: ' + checked);
    checked = 0;
}
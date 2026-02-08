// счётчики правильных и неправильных ответов
let correctAnswers = 0;
let incorrectAnswers = 0;

const correctAnswer1 = 4;    // 2 + 2
const correctAnswer2 = 4;    // 2 * 2
const correctAnswer3 = 1;    // 5 - 3 - 1
const correctAnswer4 = 12;   // 10 - 2 - 1 + 5
const correctAnswer5 = 6;    // 2 + 2 * 2 = 2 + 4 = 6

const userAnswer1Input = prompt("Вопрос 1: Сколько будет 2 + 2?");
const userAnswer1 = Number(userAnswer1Input);

if (userAnswer1 === correctAnswer1) {
    alert("Ответ Верный");
    correctAnswers++;
} else {
    alert("Ответ Неверный");
    incorrectAnswers++;
}

const userAnswer2Input = prompt("Вопрос 2: Сколько будет 2 * 2?");
const userAnswer2 = Number(userAnswer2Input);

if (userAnswer2 === correctAnswer2) {
    alert("Ответ Верный");
    correctAnswers++;
} else {
    alert("Ответ Неверный");
    incorrectAnswers++;
}

const userAnswer3Input = prompt("Вопрос 3: У Пети было 5 яблок. 3 из них он съел, 1 отдал другу. Сколько яблок у Пети осталось?");
const userAnswer3 = Number(userAnswer3Input);

if (userAnswer3 === correctAnswer3) {
    alert("Ответ Верный");
    correctAnswers++;
} else {
    alert("Ответ Неверный");
    incorrectAnswers++;
}

const userAnswer4Input = prompt("Вопрос 4: У Маши было 10 конфет. 2 она съела, 1 отдала другу. После мама дала Маше еще 5 конфет. Сколько в итоге конфет осталось у Маши?");
const userAnswer4 = Number(userAnswer4Input);

if (userAnswer4 === correctAnswer4) {
    alert("Ответ Верный");
    correctAnswers++;
} else {
    alert("Ответ Неверный");
    incorrectAnswers++;
}

const userAnswer5Input = prompt("Вопрос 5: Сколько будет 2 + 2 * 2?");
const userAnswer5 = Number(userAnswer5Input);

if (userAnswer5 === correctAnswer5) {
    alert("Ответ Верный");
    correctAnswers++;
} else {
    alert("Ответ Неверный");
    incorrectAnswers++;
}

alert(`Конец теста! Правильные ответы - ${correctAnswers}; Неправильные ответы - ${incorrectAnswers}.`);
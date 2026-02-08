console.log("=== Оригинальный цикл for ===");
for (let i = 0; i < 3; i += 1) {
    let newStudent = prompt(`Введите имя нового студента! (for - запрос ${i + 1}/3)`);
    newStudent = newStudent.trim();
    if (newStudent) {
        alert(`Добро пожаловать, ${newStudent}!`);
    }
}

console.log("=== Цикл while ===");
let whileCounter = 0;
while (whileCounter < 3) {
    let newStudent = prompt(`Введите имя нового студента! (while - запрос ${whileCounter + 1}/3)`);
    newStudent = newStudent.trim();
    if (newStudent) {
        alert(`Добро пожаловать, ${newStudent}!`);
    }
    whileCounter += 1; 
}

console.log("=== Цикл do while ===");
let doWhileCounter = 0;
do {
    let newStudent = prompt(`Введите имя нового студента! (do while - запрос ${doWhileCounter + 1}/3)`);
    newStudent = newStudent.trim();
    if (newStudent) {
        alert(`Добро пожаловать, ${newStudent}!`);
    }
    doWhileCounter += 1;
} while (doWhileCounter < 3);

console.log("Все циклы завершены!");
// Запрашиваем у пользователя три числа
let num1 = parseFloat(prompt("Введите первое число"));
let num2 = parseFloat(prompt("Введите второе число"));
let num3 = parseFloat(prompt("Введите третье число"));

// Находим наибольшее число с помощью Math.max()
let maxNum = Math.max(num1, num2, num3);

// Выводим результат
console.log("Наибольшее число:", maxNum);
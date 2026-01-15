function calculate(operation, a, b) {
    if (operation === '+') return a + b;
    if (operation === '-') return a - b;
    if (operation === '*') return a * b;
    if (operation === '/') {
        if (b === 0) return "Ошибка деления на ноль!";
        return a / b;
    }
    return "Неподдерживаемая операция.";
}

// Примеры использования функции:
console.log(calculate("+", 5, 3));      // Результат: 8
console.log(calculate("-", 10, 4));     // Результат: 6
console.log(calculate("*", 2, 6));      // Результат: 12
console.log(calculate("/", 8, 2));       // Результат: 4
console.log(calculate("%", 10, 3));     // Результат: Неподдерживаемая операция.
console.log(calculate("/", 10, 0));      // Результат: Ошибка деления на ноль!
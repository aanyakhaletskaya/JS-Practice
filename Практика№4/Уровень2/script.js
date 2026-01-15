function age(num) {
    if (num >= 0 && num <= 17) {
        console.log("Ребенок");
    } else if (num >= 18 && num <= 30) {
        console.log("Молодой");
    } else if (num >= 31 && num <= 55) {
        console.log("Зрелый");
    } else if (num > 55) {
        console.log("Старший возраст");
    } else {
        console.log("Возраст указан некорректно");
    }
}

// Пример вызова функции
age(25); // Молодой
age(5);
age(50);
age(80);
age(-10);
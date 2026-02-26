function getSumOfNumbers(number, type = 'odd') {
    let sum = 0;

    for (let i = 0; i <= number; i++) {
        // Определяем, чётное число или нет
        const isEven = i % 2 === 0;

        // Проверяем, подходит ли число под заданный type
        if (type === 'odd' && !isEven) {
            sum += i;
        } else if (type === 'even' && isEven) {
            sum += i;
        } else if (type === '') {
            sum += i;
        }
    }

    return sum;
}


console.log('1. number = 10, type = "odd"  →', getSumOfNumbers(10, 'odd'));   // 25
console.log('2. number = 10, type = "even" →', getSumOfNumbers(10, 'even'));  // 30
console.log('3. number = 10, type = ""     →', getSumOfNumbers(10, ''));      // 55

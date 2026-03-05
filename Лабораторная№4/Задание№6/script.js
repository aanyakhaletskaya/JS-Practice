
const numbers = [10, 4, 100, -5, 54, 2];

console.log('--- Способ 1: Цикл for ---');

let sumFor = 0; 

for (let i = 0; i < numbers.length; i++) {
    
    sumFor += numbers[i] ** 3; 
}

console.log('Результат через for:', sumFor); 



console.log('\n--- Способ 2: Цикл for of ---');

let sumForOf = 0; 

for (let number of numbers) {
    
    sumForOf += number ** 3;
}

console.log('Результат через for of:', sumForOf); 



console.log('\n--- Способ 3: Метод forEach ---');

let sumForEach = 0; 

numbers.forEach(number => {
    
    sumForEach += number ** 3;
});

console.log('Результат через forEach:', sumForEach); 



console.log('\n--- Способ 4: Метод reduce ---');

// reduce принимает 2 параметра:
// 1. Функция-аккумулятор (acc - накопленное значение, number - текущий элемент)
// 2. Начальное значение аккумулятора (0)
const sumReduce = numbers.reduce((acc, number) => {
    
    return acc + number ** 3;
}, 0);

console.log('Результат через reduce:', sumReduce); // 1158411



console.log('\n--- Проверка ---');
console.log('Все результаты совпадают:', 
    sumFor === 1158411 && 
    sumForOf === 1158411 && 
    sumForEach === 1158411 && 
    sumReduce === 1158411
); 
const clientsEstimations = [];


function askClientToGiveEstimation() {
    
    const estimation = prompt('Как вы оцениваете нашу кофейню от 1 до 10?');
    
    
    const estimationNumber = Number(estimation);
    
    // Проверяем, является ли введенное значение числом от 1 до 10
    // Number.isNaN проверяет, не является ли значение NaN (Not a Number)
    if (!Number.isNaN(estimationNumber) && estimationNumber >= 1 && estimationNumber <= 10) {
        
        clientsEstimations.push(estimationNumber);
    }
}


for (let i = 1; i <= 5; i++) {
    askClientToGiveEstimation();
}

// Используем filter для получения массивов с положительными и отрицательными оценками
// Положительные оценки (> 5)
const goodEstimations = clientsEstimations.filter(estimation => estimation > 5);

// Отрицательные оценки (<= 5)
const notGoodEstimations = clientsEstimations.filter(estimation => estimation <= 5);

alert(`Всего положительных оценок: ${goodEstimations.length}; Всего отрицательных оценок: ${notGoodEstimations.length}`);

console.log('Все оценки:', clientsEstimations);
console.log('Положительные оценки (>5):', goodEstimations);
console.log('Отрицательные оценки (≤5):', notGoodEstimations);
console.log(`Итого: +${goodEstimations.length}, -${notGoodEstimations.length}`);
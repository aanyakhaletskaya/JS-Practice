const addDays = (date, days = 1) => {
    const timestamp = date.getTime();
    const daysInMs = days * (1000 * 60 * 60 * 24);
    const newDate = new Date(timestamp + daysInMs);
    return newDate;
};

const addDaysShort = (date, days = 1) => {
    return new Date(date.getTime() + days * (1000 * 60 * 60 * 24));
};

console.log('=== ЛАБОРАТОРНАЯ РАБОТА №6, ЗАДАНИЕ #3 ===');
console.log('-------------------------------------------');

// Тест 1: Добавление 1 дня (по умолчанию)
const currentDate = new Date();
console.log('Текущая дата:', currentDate);

const nextDay = addDays(currentDate);
console.log('Добавили 1 день:', nextDay);

// Тест 2: Добавление 5 дней
const date1 = new Date(2024, 0, 1);
console.log('-------------------------------------------');
console.log('Исходная дата:', date1);
const datePlus5 = addDays(date1, 5);
console.log('Добавили 5 дней:', datePlus5); 

// Тест 3: Добавление 10 дней
const date2 = new Date(2024, 11, 25); 
console.log('-------------------------------------------');
console.log('Исходная дата:', date2);
const datePlus10 = addDays(date2, 10);
console.log('Добавили 10 дней:', datePlus10); 

// Тест 4: Добавление 0 дней
const date3 = new Date(2024, 5, 15); 
console.log('-------------------------------------------');
console.log('Исходная дата:', date3);
const datePlus0 = addDays(date3, 0);
console.log('Добавили 0 дней:', datePlus0); 

// Тест 5: Добавление отрицательного количества дней (в прошлое)
const date4 = new Date(2024, 5, 15); 
console.log('-------------------------------------------');
console.log('Исходная дата:', date4);
const dateMinus5 = addDays(date4, -5);
console.log('Вычли 5 дней (добавили -5):', dateMinus5); 

// Тест 6: Добавление 30 дней (переход через месяц)
const date5 = new Date(2024, 0, 15); 
console.log('-------------------------------------------');
console.log('Исходная дата:', date5);
const datePlus30 = addDays(date5, 30);
console.log('Добавили 30 дней:', datePlus30); 

// Тест 7: Добавление 365 дней (следующий год)
const date6 = new Date(2024, 2, 15); 
console.log('-------------------------------------------');
console.log('Исходная дата:', date6);
const datePlus365 = addDays(date6, 365);
console.log('Добавили 365 дней:', datePlus365); 

// Тест 8: Проверка краткой версии функции
console.log('-------------------------------------------');
console.log('=== ПРОВЕРКА КРАТКОЙ ВЕРСИИ ===');
const testDate = new Date(2024, 0, 1); 
const resultShort = addDaysShort(testDate, 7);
console.log('Краткая версия (добавили 7 дней):', resultShort); 

console.log('-------------------------------------------');
console.log('=== ВЫВОД В ФОРМАТЕ ДЕНЬ.МЕСЯЦ.ГОД ===');

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const startDate = new Date(2024, 0, 1);
console.log('Начальная дата:', formatDate(startDate));
console.log('Через 1 день:', formatDate(addDays(startDate, 1)));
console.log('Через 7 дней:', formatDate(addDays(startDate, 7)));
console.log('Через 30 дней:', formatDate(addDays(startDate, 30)));
console.log('Через 365 дней:', formatDate(addDays(startDate, 365)));
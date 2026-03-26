const addZero = (numberStr) => {
    
    const stringNumber = String(numberStr);
    
    return stringNumber.length === 1 ? `0${stringNumber}` : stringNumber;
};


const getDateFormat = (date, separator = '.') => {
    
    const dateItem = date.getDate();
    
    const month = date.getMonth();
    
    const year = date.getFullYear();
    
    const dateArray = [dateItem, month + 1, year].map((item) => addZero(item));
    
    return dateArray.join(separator);
};

console.log('=== ЛАБОРАТОРНАЯ РАБОТА №6, ЗАДАНИЕ №1 ===');
console.log('-------------------------------------------');

// Тест 1: Текущая дата с разделителем по умолчанию (точка)
const currentDate = new Date();
const formattedDate = getDateFormat(currentDate);
console.log('Текущая дата (разделитель "."):', formattedDate);

// Тест 2: Конкретная дата с разделителем "точка"
const specificDate1 = new Date(2001, 4, 5); 
console.log('5 мая 2001 с точкой:', getDateFormat(specificDate1, '.'));

// Тест 3: Конкретная дата с разделителем "тире"
const specificDate2 = new Date(1995, 11, 25); 
console.log('25 декабря 1995 с тире:', getDateFormat(specificDate2, '-'));

// Тест 4: Проверка добавления нулей для однозначных чисел
const testDate = new Date(2020, 0, 5); 
console.log('5 января 2020 (должно быть 05.01.2020):', getDateFormat(testDate, '.'));

const testDate2 = new Date(2022, 8, 15); 
console.log('15 сентября 2022 (должно быть 15.09.2022):', getDateFormat(testDate2, '.'));

// Тест 5: 31 декабря
const newYear = new Date(2023, 11, 31);
console.log('31 декабря 2023:', getDateFormat(newYear, '.'));

console.log('-------------------------------------------');
alert(`Сегодня: ${getDateFormat(new Date())}`);
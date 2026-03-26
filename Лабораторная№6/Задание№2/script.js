const convertMsToDays = (milliseconds) => {
    return Math.round(milliseconds / (1000 * 60 * 60 * 24));
};

const getDaysBeforeBirthday = (nextBirthdayDate) => {
    const currentDate = new Date();
    const currentMs = currentDate.getTime();
    const birthdayMs = nextBirthdayDate.getTime();
    const differenceMs = birthdayMs - currentMs;
    return convertMsToDays(differenceMs);
};

// Текущая дата для примера
const today = new Date();
const currentYear = today.getFullYear();

// Пример 1: День рождения 15 сентября текущего года
const birthday1 = new Date(currentYear, 8, 15); // 8 = сентябрь (месяцы с 0)
const days1 = getDaysBeforeBirthday(birthday1);
console.log('До дня рождения 15 сентября осталось:', days1, 'дней');

// Пример 2: День рождения 31 декабря текущего года
const birthday2 = new Date(currentYear, 11, 31); // 11 = декабрь
const days2 = getDaysBeforeBirthday(birthday2);
console.log('До дня рождения 31 декабря осталось:', days2, 'дней');

// Пример 3: День рождения 1 января следующего года
const birthday3 = new Date(currentYear + 1, 0, 1); // 0 = январь
const days3 = getDaysBeforeBirthday(birthday3);
console.log('До дня рождения 1 января осталось:', days3, 'дней');

// Пример 4: День рождения сегодня
const birthday4 = new Date(currentYear, today.getMonth(), today.getDate());
const days4 = getDaysBeforeBirthday(birthday4);
console.log('До дня рождения сегодня осталось:', days4, 'дней');


const myNextBirthday = new Date(currentYear, 8, 15);
const daysUntilBirthday = getDaysBeforeBirthday(myNextBirthday);
alert(`До вашего дня рождения осталось ${daysUntilBirthday} дней!`);
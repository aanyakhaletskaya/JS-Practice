const userName = prompt('Как вас зовут?');


if (userName === null || userName.trim() === '') {
    alert('Вы не ввели имя!');
    throw new Error('Имя не введено');
}

const formattedName = userName.trim().toLowerCase();

const userAgeInput = prompt('Сколько вам лет?');

if (userAgeInput === null || userAgeInput.trim() === '') {
    alert('Вы не ввели возраст!');
    throw new Error('Возраст не введён');
}

const trimmedAge = userAgeInput.trim();
const userAge = Number(trimmedAge);

// проверка, что возраст это число
if (isNaN(userAge)) {
    alert('Вы ввели некорректный возраст! Пожалуйста, введите число.');
    throw new Error('Возраст не является числом');
}

// проверка, что возраст не отрицательный
if (userAge < 0) {
    alert('Возраст не может быть отрицательным!');
    throw new Error('Отрицательный возраст');
}

alert(`Вас зовут ${formattedName} и вам ${userAge} лет`);
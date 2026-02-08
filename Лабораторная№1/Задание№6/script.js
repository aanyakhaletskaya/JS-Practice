const userTextInput = prompt('Введите текст:');

if (userTextInput === null || userTextInput.trim() === '') {
    alert('Вы не ввели текст!');
    throw new Error('Текст не введён');
}

// убирает лишние пробелы
const userText = userTextInput.trim();

const wordFromTextInput = prompt('Введите слово из текста:');

if (wordFromTextInput === null || wordFromTextInput.trim() === '') {
    alert('Вы не ввели слово для поиска!');
    throw new Error('Слово для поиска не введено');
}

const wordFromText = wordFromTextInput.trim();

//  находит индекс слова в тексте
const indexOfWord = userText.indexOf(wordFromText);

if (indexOfWord === -1) {
    alert(`Слово "${wordFromText}" не найдено в тексте!`);
    throw new Error('Слово не найдено в тексте');
}

// обрезает текст от начала до индекса слова  
// проверка если нужно включить слово полностью, добавляем длину слова к индексу
const endIndex = indexOfWord + wordFromText.length;
const resultString = userText.slice(0, endIndex);

alert(`Результат: ${resultString}`);
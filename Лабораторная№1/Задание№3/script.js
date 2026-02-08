const userName = prompt('Как вас зовут?');


if (userName === null || userName.trim() === '') {
    
    alert('Вы не ввели имя!');
} else {
    // убирает пробелы в начале и конце trim()
    // все буквы делаем строчными toLowerCase()
    const formattedName = userName.trim().toLowerCase();
    
    
    alert(`Вас зовут ${formattedName}`);
}
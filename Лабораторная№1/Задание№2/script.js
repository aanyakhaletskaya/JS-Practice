const myName = "Алексей";
const programmingLanguage = "JavaScript";
const courseCreatorName = "Максим";
const reasonText = "это позволяет создавать современные и интерактивные веб-приложения";
const numberOfMonth = 2;


let myInfoText = `Всем привет! Меня зовут ${myName}. Сейчас я изучаю язык программирования ${programmingLanguage} на курсе по ${programmingLanguage} у ${courseCreatorName}.
Я хочу стать веб-разработчиком, потому что ${reasonText}. До этого я изучал(a) ${programmingLanguage} ${numberOfMonth} месяцев. Я уверен(a), что пройду данный курс до конца!`;


myInfoText = myInfoText.replaceAll("JavaScript", "JAVASCRIPT");


console.log("=== Итоговая строка ===");
console.log(myInfoText);


console.log("=== Длина строки ===");
console.log(`Длина строки: ${myInfoText.length} символов`);


console.log("=== Первый и последний символы ===");
console.log(`Первый символ: "${myInfoText[0]}"`);
console.log(`Последний символ: "${myInfoText[myInfoText.length - 1]}"`);
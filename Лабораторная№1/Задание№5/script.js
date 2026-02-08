const userString = prompt('Введите текст для обрезки:').trim();
const startSliceIndex = Number(prompt('Введите индекс, с которого нужно начать обрезку строки:'));
const endSliceIndex = Number(prompt('Введите индекс, с которого нужно закончить обрезку строки:'));

const resultString = userString.slice(startSliceIndex, endSliceIndex);
alert(`Результат: ${resultString}`);
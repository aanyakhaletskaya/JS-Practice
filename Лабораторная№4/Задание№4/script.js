const coffees = ['Latte', 'Cappuccino', 'Americano'];
const prices = [1.5, 1, 2];

// Используем map для создания нового массива с увеличенными на 0.5 ценами
// map проходит по каждому элементу массива prices и возвращает новый массив
const updatedPrices = prices.map(price => price + 0.5);


coffees.forEach((coffee, index) => {
    
    alert(`Кофе ${coffee} сейчас стоит ${updatedPrices[index]} евро`);
});

console.log('Исходные цены:', prices);
console.log('Новые цены:', updatedPrices);
const coffees = ['Latte', 'Cappuccino', 'Americano'];


function searchCoffee() {
    
    const coffeeName = prompt('Поиск кофе по названию:');
    
    if (coffeeName === null) {
        return; 
    }
    
    const lowerCaseCoffeeName = coffeeName.toLowerCase().trim();
    
    const foundIndex = coffees.findIndex(coffee => 
        coffee.toLowerCase() === lowerCaseCoffeeName
    );
    
    if (foundIndex !== -1) {
        
        const foundCoffee = coffees[foundIndex];
        const popularityNumber = foundIndex + 1; 
        
        
        let numberWord;
        if (popularityNumber === 1) numberWord = 'первый';
        else if (popularityNumber === 2) numberWord = 'второй';
        else if (popularityNumber === 3) numberWord = 'третий';
        else numberWord = popularityNumber + '-й';
        

        alert(`Держите ваш любимый кофе ${foundCoffee}. ${numberWord} по популярности в нашей кофейне.`);
    } else {
        alert('К сожалению, такого вида кофе нет в наличии');
    }
}

searchCoffee();

console.log('Доступные виды кофе:', coffees);
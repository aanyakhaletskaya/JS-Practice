function getDivisorsCount(number = 1) {
    // число должно быть положительным и целым
    if (number < 0 || !Number.isInteger(number)) {
        alert("number должен быть целым числом и больше нуля!");
        return; 
    }
    
    let count = 0; 
    
    
    for (let i = 1; i <= number; i++) {
        // Если number делится на i без остатка
        if (number % i === 0) {
            count++; 
        }
    }
    
    return count; 
}
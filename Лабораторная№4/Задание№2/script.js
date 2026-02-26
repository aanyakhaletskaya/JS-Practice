function getSumOfSequence(number) {
    
    const sequence = [];
    
    for (let i = 1; i <= number; i++) {
        sequence.push(i);
    }
    
    
    return sequence[0] + sequence[sequence.length - 1];
}


console.log(getSumOfSequence(5));  // 6  (массив [1,2,3,4,5], 1+5=6)
console.log(getSumOfSequence(1));  // 2  (массив [1], 1+1=2)
console.log(getSumOfSequence(10)); // 11 (массив [1,2,3,4,5,6,7,8,9,10], 1+10=11)
console.log(getSumOfSequence(3));  // 4  (массив [1,2,3], 1+3=4)
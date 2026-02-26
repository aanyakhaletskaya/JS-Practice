const peopleWaiting = ['Кристина', 'Олег', 'Кирилл', 'Мария', 'Светлана', 'Артем', 'Глеб'];


function giveParcel() {
    if (peopleWaiting.length === 0) {
        alert('В очереди никого нет!');
        return;
    }
    
    const person = peopleWaiting.shift(); 
    alert(`${person} получил(а) посылку. В очереди осталось ${peopleWaiting.length} человек.`);
}

function leaveQueueWithoutParcel() {
    if (peopleWaiting.length === 0) {
        alert('В очереди никого нет!');
        return;
    }
    
    const person = peopleWaiting.pop(); 
    alert(`${person} не получил(а) посылку и ушел(ла) из очереди.`);
}


console.log('Исходная очередь:', [...peopleWaiting]);


console.log('\n--- Шаг 1: Кристина и Олег получают посылки ---');
giveParcel(); 
giveParcel(); 


console.log('\n--- Шаг 2: Обеденный перерыв ---');
giveParcel(); 


while (peopleWaiting.length > 0) {
    leaveQueueWithoutParcel();
}

console.log('\nОчередь после всех действий:', peopleWaiting);
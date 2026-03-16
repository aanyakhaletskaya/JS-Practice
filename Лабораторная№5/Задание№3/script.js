function handleObjects(obj, key, action) {
    switch (action) {
        case 'get':
            return obj[key];
        

        case 'add':
            obj[key] = "";
            return obj;
        
        
        case 'delete':
            delete obj[key];
            return obj;
        
        default:
            return obj;
    }
}

const student = {
    name: 'Maxim',
    programmingLanguage: 'JavaScript'
};

const result = handleObjects(student, 'programmingLanguage', 'delete');
console.log('result', result);
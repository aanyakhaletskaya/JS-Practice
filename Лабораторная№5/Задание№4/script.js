function giveJobToStudent(student, jobName) {
    const updatedStudent = { ...student };
    updatedStudent.job = jobName;
    
    alert(`Поздравляем! У студента ${updatedStudent.fullName} появилась новая работа! Теперь он ${updatedStudent.job}`);
    return updatedStudent;
}

console.log('=== ТЕСТИРОВАНИЕ ФУНКЦИИ giveJobToStudent ===');
console.log('-------------------------------------------');

const student = {
    fullName: 'Максим',
    experienceInMonths: 12,
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
};

console.log('Исходный объект student:', student);

const updatedStudent = giveJobToStudent(student, 'веб-разработчик');

console.log('Обновленный объект updatedStudent:', updatedStudent);

console.log('-------------------------------------------');
console.log('Проверка иммутабельности (исходный объект не должен меняться):');
console.log('Исходный student после вызова функции:', student);
console.log('Совпадают ли объекты?', student === updatedStudent); 
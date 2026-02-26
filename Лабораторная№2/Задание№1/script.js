const existUserIdLogin = "the_best_user";
const existUserIdPassword = "12345678";

const userLoginInput = prompt("Введите логин:");

if (userLoginInput === null) {
    alert("Ввод логина отменён!");
    throw new Error("Ввод логина отменён пользователем");
}

const userLogin = userLoginInput.trim();

const userPasswordInput = prompt("Введите пароль:");

if (userPasswordInput === null) {
    alert("Ввод пароля отменён!");
    throw new Error("Ввод пароля отменён пользователем");
}

const userPassword = userPasswordInput.trim();

// проверяем совпадение 
if (userLogin === existUserIdLogin && userPassword === existUserIdPassword) {
    alert(`Добро пожаловать, ${userLogin}!`);
} else {
    alert("Логин и (или) Пароль введены неверно");
}
/* 
'5' === 5 false
'5' == 5 true  */


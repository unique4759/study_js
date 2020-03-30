'use strict';

let money = 25000, 
    income = 'фриланс', 
    addExpenses = 'квартира, Еда, подарки', 
    deposit = false, 
    mission = 500000, 
    period = 3;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяца. Цель заработать ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log(budgetDay);

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = Boolean(confirm('Есть ли у вас депозит в банке?'));

let expensesOne = prompt('Введите обязательную статью расходов?');
let amountOne = +prompt('Во сколько это обойдется?');

let expensesTwo = prompt('Введите обязательную статью расходов?');
let amountTwo = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amountOne + amountTwo);
console.log('Бюджет на месяц: ' + budgetMonth);

console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth));

budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 || budgetDay === 0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
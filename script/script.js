'use strict';

let money = 25000, 
    income = 'фриланс', 
    addExpenses = 'квартира, Еда, подарки', 
    deposit = false, 
    mission = 500000, 
    period = 3;

function showTypeOf () {
    console.log(typeof money, typeof income, typeof deposit);
}
showTypeOf();

let budgetDay = money / 30;

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = Boolean(confirm('Есть ли у вас депозит в банке?'));

let expensesOne = prompt('Введите обязательную статью расходов?');
let amountOne = +prompt('Во сколько это обойдется?');

let expensesTwo = prompt('Введите обязательную статью расходов?');
let amountTwo = +prompt('Во сколько это обойдется?');

function getExpensesMonth() {
    return amountOne + amountTwo;
}
console.log(getExpensesMonth());

console.log(addExpenses.split(', '));

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return 'Цель будет достигнута за: ' + Math.ceil(mission / accumulatedMonth) + ' месяцев';
}
console.log(getTargetMonth());

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay + ' рублей');

function getStatusIncome() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay <= 600 || budgetDay === 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
}
console.log(getStatusIncome());
'use strict';

function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money, 
    income = 'фриланс', 
    addExpenses = 'квартира, Еда, подарки', 
    deposit = false, 
    mission = 500000, 
    period = 3;

function start() {
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNum(money));
}
start();

function showTypeOf () {
    console.log(typeof money, typeof income, typeof deposit);
}
showTypeOf();

let budgetDay = money / 30;

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = Boolean(confirm('Есть ли у вас депозит в банке?'));

let expenses = [];

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        const howAmount = +prompt('Во сколько это обойдется?');

        if(isNum(howAmount)) {
            sum += howAmount;
        }
    }
    console.log(expenses);
    return sum;
}

let expensesAmount = getExpensesMonth();

console.log(expensesAmount);

console.log(addExpenses.split(', '));

function getAccumulatedMonth() {
    return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    let calcMonth = Math.ceil(mission / accumulatedMonth);

    return calcMonth > 0 ? 'Цель будет достигнута за: ' + calcMonth + ' месяцев' : 'Цель не будет достигнута';
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
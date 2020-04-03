'use strict';

function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

function start() {
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNum(money) || !money);
}
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 10,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let ask = prompt('Введите обязательную статью расходов?');
            appData.expenses[ask] = +prompt('Во сколько это обойдется?');
        }
        // console.log(appData.expenses);

        return appData.addExpenses;
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
};

appData.asking();

appData.budget = money;

appData.getExpensesMonth = function () {
    for (let key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
    }
    console.log(appData.expensesMonth);

    return appData.expensesMonth;
};

// let expensesAmount = appData.getExpensesMonth();
// console.log(expensesAmount);

appData.getBudget = function () {
    appData.budgetDay = appData.budget / 30;
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    // return money - expensesAmount;
};
appData.getBudget();
// let accumulatedMonth = appData.getBudget();

appData.budgetDay = Math.floor(appData.budgetMonth / 30);
// console.log('Бюджет на день: ' + appData.budgetDay + ' рублей');

appData.getTargetMonth = function () {
    let calcMonth = Math.ceil(appData.mission / appData.budgetMonth);

    return calcMonth > 0 ? 'Цель будет достигнута за: ' + calcMonth + ' месяцев' : 'Цель не будет достигнута';
};
console.log(appData.getTargetMonth());

appData.getStatusIncome = function () {
    if (appData.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (appData.budgetDay <= 600 || appData.budgetDay === 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');

for(let key in appData) {
    console.log(key + ': ' + appData[key]);
}
'use strict';

function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let calculate = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomes = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('result-total')[0],
    budgetDay = document.getElementsByClassName('result-total')[1],
    expensesMonth = document.getElementsByClassName('result-total')[2],
    additionalIncome = document.getElementsByClassName('result-total')[3],
    additionalExpenses = document.getElementsByClassName('result-total')[4],
    incomePeriod = document.getElementsByClassName('result-total')[5],
    targetMonth = document.getElementsByClassName('result-total')[6],
    cancel = document.getElementById('cancel'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function () {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomes.forEach(function (item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    changeRange: function(e) {
        periodAmount.textContent = e.target.value;
    }
};

appData.start = function() {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
};

if(salaryAmount.value === '') {
    calculate.disabled = true;
}

salaryAmount.addEventListener('input', function(e) {
    if(e.target.value !== '') {
        calculate.disabled = false;
        calculate.addEventListener('click', appData.start);
    } else {
        calculate.disabled = true;
    }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeRange);

appData.showResult = function () {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = appData.budgetDay,
    expensesMonth.value = appData.expensesMonth;
    additionalExpenses.value = appData.addExpenses.join(', ');
    additionalIncome.value = appData.addIncome.join(', ');
    targetMonth.value = appData.getTargetMonth();

    periodSelect.addEventListener('change', function (e) {
        periodSelect.value = e.target.value;
        incomePeriod.value = appData.calcSavedMoney();
    });
    incomePeriod.value = appData.calcSavedMoney();
};

appData.getExpensesMonth = function () {
    for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
    }

    return appData.expensesMonth;
};

appData.getBudget = function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};

appData.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
};

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

appData.getInfoDeposut = function() {
    if(appData.deposit) {
        do{
            appData.percentDeposit = prompt('Какой годовой процент?');
        }
        while(!isNum(appData.percentDeposit) || !appData.percentDeposit);

        do{
            appData.moneyDeposit = prompt('Какая сумма заложена?');
        }
        while(!isNum(appData.moneyDeposit) || !appData.moneyDeposit);
    }
};
appData.getInfoDeposut();

appData.calcSavedMoney = function () {
    console.log(periodSelect.value);
    return appData.budgetMonth * periodSelect.value;
};
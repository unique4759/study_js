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
    periodAmount = document.querySelector('.period-amount'),
    rightPartInputs = document.querySelectorAll('.result input[type="text"]');

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
    start: function() {
        this.budget = +salaryAmount.value;
    
        this.getExpenses.call(appData);
        this.getIncome.call(appData);
        this.getExpensesMonth.call(appData);
        this.getBudget.call(appData);
        this.getAddExpenses.call(appData);
        this.getAddIncome.call(appData);

        this.showResult.call(appData);

        this.inputsDisabled.call(appData);
    },
    getExpenses: function () {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

        return this.expensesMonth;
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomes.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    showResult: function () {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay,
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = this.getTargetMonth();

        periodSelect.addEventListener('change', function (e) {
            periodSelect.value = e.target.value;
            incomePeriod.value = this.calcSavedMoney.call(appData);
        });
        incomePeriod.value = this.calcSavedMoney.call(appData);
    },
    changeRange: function(e) {
        periodAmount.textContent = e.target.value;
    },
    getTargetMonth: function () {
        let result = targetAmount.value === '' ? 0 : Math.ceil(targetAmount.value / this.budgetMonth);
        return result;
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    inputsDisabled: function() {
        let leftPartInputs = document.querySelectorAll('.data input[type="text"]');

        leftPartInputs.forEach((input) => {
            input.disabled = true;
        });

        calculate.style.display = 'none';
        cancel.style.display = 'block';
    },
    reset: function (){
        Object.assign(appData, copy);

        let leftPartInputs = document.querySelectorAll('.data input[type="text"]');
        
        if(incomeItems.length > 1) {
            incomeItems[0].parentNode.removeChild(incomeItems[0]);
        }
        if(expensesItems.length > 1) {
            expensesItems[0].parentNode.removeChild(expensesItems[0]);
        }

        leftPartInputs.forEach(function (input) {
            input.value = '';
            input.disabled = false;
        });

        rightPartInputs.forEach(function (input) {
            input.value = '';
        });

        if(salaryAmount.value === '') {
            calculate.disabled = true;
        }

        periodSelect.value = 1;
        periodAmount.textContent = 1;

        calculate.style.display = 'block';
        cancel.style.display = 'none';
    }
};

let copy = Object.assign({}, appData);

calculate.disabled = true;

salaryAmount.addEventListener('input', (e) => {
    if(e.target.value !== '') {
        calculate.disabled = false;
    } else {
        calculate.disabled = true;
    }
});

calculate.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', appData.changeRange.bind(appData));

// appData.getStatusIncome = function () {
//     if (appData.budgetDay >= 1200) {
//         return 'У вас высокий уровень дохода';
//     } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
//         return 'У вас средний уровень дохода';
//     } else if (appData.budgetDay <= 600 || appData.budgetDay === 0) {
//         return 'К сожалению, у вас уровень дохода ниже среднего';
//     } else {
//         return 'Что то пошло не так';
//     }
// };

// appData.getInfoDeposut = function() {
//     if(appData.deposit) {
//         do{
//             appData.percentDeposit = prompt('Какой годовой процент?');
//         }
//         while(!isNum(appData.percentDeposit) || !appData.percentDeposit);

//         do{
//             appData.moneyDeposit = prompt('Какая сумма заложена?');
//         }
//         while(!isNum(appData.moneyDeposit) || !appData.moneyDeposit);
//     }
// };
// appData.getInfoDeposut();
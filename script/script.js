'use strict';

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

function AppData() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

let copy = Object.assign({}, new AppData());

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();

    this.inputsDisabled();
};
AppData.prototype.getExpenses = function () {
    let _this = this;
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    let _this = this;
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });

    for (let key in _this.income) {
        _this.incomeMonth += +_this.income[key];
    }
};
AppData.prototype.getExpensesMonth = function () {
    let _this = this;
    for (let key in _this.expenses) {
        _this.expensesMonth += +_this.expenses[key];
    }

    return _this.expensesMonth;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getAddExpenses = function() {
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if(item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    let _this = this;
    additionalIncomes.forEach((item) => {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.showResult = function () {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay,
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();

    periodSelect.addEventListener('change', (e) => {
        periodSelect.value = e.target.value;
        incomePeriod.value = this.calcSavedMone.apply(this);
    });
    incomePeriod.value = this.calcSavedMoney.apply(this);
};
AppData.prototype.changeRange = function(e) {
    periodAmount.textContent = e.target.value;
};
AppData.prototype.getTargetMonth = function () {
    let result = targetAmount.value === '' ? 0 : Math.ceil(targetAmount.value / this.budgetMonth);
    return result;
};
AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.inputsDisabled = function() {
    let leftPartInputs = document.querySelectorAll('.data input[type="text"]');

    leftPartInputs.forEach((input) => {
        input.disabled = true;
    });

    incomePlus.disabled = true;
    expensesPlus.disabled = true;
    periodSelect.disabled = true;

    calculate.style.display = 'none';
    cancel.style.display = 'block';
};
AppData.prototype.reset = function (){
    Object.assign(this, copy);

    let leftPartInputs = document.querySelectorAll('.data input[type="text"]');
    
    if(incomeItems.length === 3) {
        incomePlus.style.display = 'block';
    }
    incomeItems.forEach(function(item, index) {
        if(index !== 0) {
            item.remove();
        }
    });

    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'block';
    }
    expensesItems.forEach(function(item, index) {
        if(index !== 0) {
            item.remove();
        }
    });

    incomePlus.disabled = false;
    expensesPlus.disabled = false;
    periodSelect.disabled = false;

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
};
AppData.prototype.eventListeners = function() {
    salaryAmount.addEventListener('input', (e) => {
        if(e.target.value !== '') {
            calculate.disabled = false;
        } else {
            calculate.disabled = true;
        }
    });

    calculate.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', this.changeRange.bind(this));
};

let appData = new AppData();

appData.eventListeners();

calculate.disabled = true;
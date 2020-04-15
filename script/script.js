'use strict';

const calculate = document.getElementById('start'),
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
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    rightPartInputs = document.querySelectorAll('.result input[type="text"]');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
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
    }

    start() {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
    
        this.showResult();
    
        this.inputsDisabled();
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
    
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
    
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
    
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    
        return this.expensesMonth;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomes.forEach((item) => {
            const itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
    
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
    
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay,
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = this.getTargetMonth();
        
        periodSelect.addEventListener('change', (e) => {
            periodSelect.value = e.target.value;
            incomePeriod.value = this.calcSavedMoney();
        });
        incomePeriod.value = this.calcSavedMoney();
    }

    changeRange(e) {
        periodAmount.textContent = e.target.value;
    }

    getTargetMonth() {
        const result = targetAmount.value === '' ? 0 : Math.ceil(targetAmount.value / this.budgetMonth);
        return result;
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    inputsDisabled() {
        const leftPartInputs = document.querySelectorAll('.data input[type="text"]');
    
        leftPartInputs.forEach((input) => {
            input.disabled = true;
        });
    
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        periodSelect.disabled = true;
    
        calculate.style.display = 'none';
        cancel.style.display = 'block';
    }

    reset() {
        const copy = Object.assign({}, new AppData());

        Object.assign(this, copy);
    
        const leftPartInputs = document.querySelectorAll('.data input[type="text"]');
        
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'block';
        }

        incomeItems.forEach((item, index) => {
            if(index !== 0) {
                item.remove();
            }
        });
    
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'block';
        }
        expensesItems.forEach((item, index) => {
            if(index !== 0) {
                item.remove();
            }
        });
    
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        periodSelect.disabled = false;
    
        leftPartInputs.forEach((input) => {
            input.value = '';
            input.disabled = false;
        });
    
        rightPartInputs.forEach((input) => {
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

    eventListeners() {
        calculate.disabled = true;
    
        salaryAmount.addEventListener('input', (e) => {
            if(e.target.value !== '') {
                calculate.disabled = false;
            } else {
                calculate.disabled = true;
            }
        });
    
        calculate.addEventListener('click', () => this.start());
        cancel.addEventListener('click', () => this.reset());
        
        expensesPlus.addEventListener('click', () => this.addExpensesBlock());
        incomePlus.addEventListener('click', () => this.addIncomeBlock());
        periodSelect.addEventListener('input', (e) => this.changeRange(e));
    }
};

const appData = new AppData();

appData.eventListeners();
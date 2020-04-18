'use strict';

const calculate = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
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

        this.getExpInc();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpInc();
    
        this.showResult();
    
        this.inputsDisabled();
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const cashAmount = item.querySelector(`.${startStr}-amount`).value;
    
            if(itemTitle !== '' && cashAmount !== '') {
                this[startStr][itemTitle] = +cashAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    
    getAddExpInc() {
        const addExpenses = additionalExpensesItem.value.split(',');

        const itemValue = item => {
            const checkArr = item.value ? this.addIncome : this.addExpenses;
            item = item.value || item.value === '' ? item.value : item;
            if(item !== '') {
                checkArr.push(item.trim());
            }
        };

        additionalIncomes.forEach(itemValue);
        addExpenses.forEach(itemValue);
    }

    addExpIncBlock(type, plus) {
        let items = type === 'income' ? incomeItems : expensesItems;
        const cloneItems = items[0].cloneNode(true);

        items[0].parentNode.insertBefore(cloneItems, plus);
        items = document.querySelectorAll(`.${type}-items`);

        if(items.length === 3) {
            plus.style.display = 'none';
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
        const incomeInputs = document.querySelectorAll('.income-items');
        const expensesInputs = document.querySelectorAll('.expenses-items');

        if(incomeInputs.length === 3) {
            incomePlus.style.display = 'block';
        }

        incomeInputs.forEach((item, index) => {
            if(index !== 0) {
                item.remove();
            }
        });
    
        if(expensesInputs.length === 3) {
            expensesPlus.style.display = 'block';
        }
        expensesInputs.forEach((item, index) => {
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

        depositPercent.style.display = 'none';
        depositPercent.value = '';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositCheck.checked = false;
    
        periodSelect.value = 1;
        periodAmount.textContent = 1;
    
        calculate.style.display = 'block';
        cancel.style.display = 'none';
    }

    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';

            depositPercent.addEventListener('input', (e) => {
                const userValue = e.target.value.replace(/[^\d]/g, '');

                if(userValue < 0 || userValue > 100 ) {
                    calculate.disabled = true;
                    depositPercent.value = '';
                    alert('Введите корректное значение в поле проценты');
                } else {
                    calculate.disabled = false;
                }
                depositPercent.value = e.target.value;
            });
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
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
        
        expensesPlus.addEventListener('click', () => this.addExpIncBlock('expenses', expensesPlus));
        incomePlus.addEventListener('click', () => this.addExpIncBlock('income', incomePlus));
        periodSelect.addEventListener('input', (e) => this.changeRange(e));
        depositCheck.addEventListener('change', () => this.depositHandler());
    }
};

const appData = new AppData();

appData.eventListeners();
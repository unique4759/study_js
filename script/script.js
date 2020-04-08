'use strict';

// function isNum(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

// let money;

// function start() {
//     do{
//         money = prompt('Ваш месячный доход?');
//     }
//     while(!isNum(money) || !money);
// }
// start();

// let appData = {
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 500000,
//     period: 10,
//     asking: function () {
//         if(confirm('Есть ли Вас дополнительный источник заработка?')) {
//             let itemIncome,
//                 cashIncome;

//             do{
//                 itemIncome = prompt('Какой у Вас дополнительный заработок?');
//             }
//             while(+itemIncome || !itemIncome);

//             do{
//                 cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
//             }
//             while(!isNum(cashIncome) || !cashIncome);

//             appData.income[itemIncome] = cashIncome;
//         }

//         let addExpenses;

//         do{
//             addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         }
//         while(+addExpenses || !addExpenses);

//         appData.addExpenses = addExpenses.toLowerCase().split(', ');
//         appData.deposit = confirm('Есть ли у Вас депозит в банке?');

//         for (let i = 0; i < 2; i++) {
//             let ask,
//                 howMatch;

//             do{
//                 ask = prompt('Введите обязательную статью расходов?');
//             }
//             while(+ask || !ask);

//             do{
//                 howMatch = prompt('Во сколько это обойдется?');
//             }
//             while(!isNum(howMatch) || !howMatch);

//             appData.expenses[ask] = +howMatch;
//         }
//         // console.log(appData.expenses);

//         return appData.addExpenses;
//     },
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
// };

// appData.asking();

// appData.budget = money;

// appData.getExpensesMonth = function () {
//     for (let key in appData.expenses) {
//         appData.expensesMonth += appData.expenses[key];
//     }
//     console.log(appData.expensesMonth);

//     return appData.expensesMonth;
// };

// // let expensesAmount = appData.getExpensesMonth();
// // console.log(expensesAmount);

// appData.getBudget = function () {
//     appData.budgetDay = appData.budget / 30;
//     appData.budgetMonth = appData.budget - appData.getExpensesMonth();
//     // return money - expensesAmount;
// };
// appData.getBudget();
// // let accumulatedMonth = appData.getBudget();

// appData.budgetDay = Math.floor(appData.budgetMonth / 30);
// // console.log('Бюджет на день: ' + appData.budgetDay + ' рублей');

// appData.getTargetMonth = function () {
//     let calcMonth = Math.ceil(appData.mission / appData.budgetMonth);

//     return calcMonth > 0 ? 'Цель будет достигнута за: ' + calcMonth + ' месяцев' : 'Цель не будет достигнута';
// };
// console.log(appData.getTargetMonth());

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
// console.log(appData.getStatusIncome());

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

// appData.calcSavedMoney = function () {
//     return appData.budgetMonth * appData.period;
// };

// console.log('Наша программа включает в себя данные:');

// for(let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }

// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

// let expensesString = '';
// appData.addExpenses.forEach(function (item) {
//     expensesString += item[0].toUpperCase() + item.substr(1).toLowerCase() + ', ';
// });
// console.log(expensesString.slice(0, -2));

// let button = document.getElementById('start'),
//     plusOne = document.getElementsByTagName('button')[0],
//     plusTwo = document.getElementsByTagName('button')[1],
//     checkBox = document.querySelector('#deposit-check'),
//     additionalIncomes = document.querySelectorAll('.additional_income-item'),
//     budgetDay = document.getElementsByClassName('result-total')[1],
//     expensesMonth = document.getElementsByClassName('result-total')[2],
//     additionalIncome = document.getElementsByClassName('result-total')[3],
//     additionalExpenses = document.getElementsByClassName('result-total')[4],
//     incomePeriod = document.getElementsByClassName('result-total')[5],
//     targetMonth = document.getElementsByClassName('result-total')[6],
//     cancel = document.getElementById('cancel'),
//     salaryAmount = document.querySelector('.salary-amount'),
//     incomeTitle = document.querySelector('.income-title'),
//     incomeAmount = document.querySelector('.income-amount'),
//     expensesTitle = document.querySelector('.expenses-title'),
//     expensesAmount = document.querySelector('.expenses-amount'),
//     additionalExpensesItem = document.querySelector('.additional_expenses-item'),
//     depositBank = document.querySelector('.deposit-bank'),
//     depositAmount = document.querySelector('.deposit-amount'),
//     depositPercent = document.querySelector('.deposit-percent'),
//     targetAmount = document.querySelector('.target-amount'),
//     periodSelect = document.querySelector('.period-select');

let allBooks = document.querySelector('.books'),
    books = document.querySelectorAll('.book');

allBooks.prepend(books[1]);  
books[2].after(books[4]);  
allBooks.append(books[2]);  

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

books[4].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

let bookTwo = books[0].querySelectorAll('li');
bookTwo[3].after(bookTwo[2]);
bookTwo[3].after(bookTwo[6]);
bookTwo[6].after(bookTwo[8]);
bookTwo[10].before(bookTwo[2]);

let bookFive = books[5].querySelectorAll('li');
bookFive[2].after(bookFive[9]);
bookFive[4].after(bookFive[5]);
bookFive[6].after(bookFive[8]);
bookFive[6].before(bookFive[2]);
bookFive[8].before(bookFive[5]);
bookFive[5].before(bookFive[7]);

let bookSix = books[2].querySelectorAll('li');
bookSix[9].insertAdjacentHTML('beforebegin', '<li>Глава 8: За пределами ES6</li>')
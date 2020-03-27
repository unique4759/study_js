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
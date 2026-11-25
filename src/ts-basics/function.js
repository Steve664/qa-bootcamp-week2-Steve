"use strict";
function calculateTax(salary) {
    if (salary < 50000) {
        return salary * 1.2;
    }
    return salary * 1.3;
}
let x = calculateTax(25000);
let y = calculateTax(60000);
console.log(x);
console.log(y);

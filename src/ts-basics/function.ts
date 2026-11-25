function calculateTax(salary:number):number{
    if (salary < 50000){
        return salary * 1.2;
    }
    return salary * 1.3;
}

let x: number = calculateTax(25000);
let y: number = calculateTax(60000);
console.log(x);
console.log(y);
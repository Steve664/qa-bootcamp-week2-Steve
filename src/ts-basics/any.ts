let sales: number = 123_456_789;
let course: string = "Typescript";
let is_published: boolean = true;
let level; //any type
//type any can be used to store any type of value, but it is not recommended to use it as it defeats 
// the purpose of using TypeScript. 
// It is better to use specific types for variables to ensure type safety and catch errors at compile time.

function render(document: any) {
    console.log(document);
}
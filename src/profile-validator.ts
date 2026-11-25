type User = {
    id:number;
    username:string;
    settings?:{
        notifications:boolean;
    }
}
let john: User = {
    id:1,
    username:"john",
    settings:{
        notifications:true
    }
}

let jane: User = {
    id:2,
    username:"jane"
}

let Toby: User = {
    id:3,
    username:"Toby",
    settings:{
        notifications:false
    }
}

function isNotified(user: User): boolean{
    return user.settings?.notifications === true;
}
console.log(isNotified(john)); // true
console.log(isNotified(jane)); // false
console.log(isNotified(Toby)); // false
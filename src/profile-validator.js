"use strict";
let john = {
    id: 1,
    username: "john",
    settings: {
        notifications: true
    }
};
let jane = {
    id: 2,
    username: "jane"
};
let Toby = {
    id: 3,
    username: "Toby",
    settings: {
        notifications: false
    }
};
function isNotified(user) {
    return user.settings?.notifications === true;
}
console.log(isNotified(john)); // true
console.log(isNotified(jane)); // false
console.log(isNotified(Toby)); // false

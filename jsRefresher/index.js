/*
****************
Vanilla js
****************
*/

/*
var name, age, hasHobbies;
name = "Habeeb";
age = 24;
hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobby) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    " and the user has hobbies: " +
    userHasHobby
  );
}

console.log(summarizeUser(name, age, hasHobbies));
*/

/*
****************
es6 js
****************
*/

/*
const name = "Habeeb";
let age = 24;
const hasHobbies = true;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return ` Name is ${userName}, age is ${userAge} and the user has hobbies: ${userHasHobby}`;
};

const add = (a, b) => a + b;
console.log(summarizeUser(name, age, hasHobbies), '\n' + add(5, 3));
*/

/*
****************
object:
NOTE: for the 'this' keyword to point to the person Object,
you cannot use arrow function.
****************
*/

/*
const person = {
  username: "Habeeb",
  age: 24,
  greet: function(){
    console.log(`Hi, i am ${this.username}`);
  },
};

person.greet();
*/

/*
****************
Array 
****************
*/

/*
const hobbies = ["Sports", "Coding", "Movie"];
for (let hobby of hobbies) {
  console.log(hobby);
}
*/
/*
const hobbies = ["Sports", "Coding", "Movie"];
let listOfHobbies = hobbies.map((hobby, hobbyIndex) => {
  return `Hobby ${hobbyIndex}: ${hobby}`;
});

console.log(listOfHobbies, hobbies);
*/

/*
****************
spread and rest operator:
spread operator, use for enforcing principle of immutability 
****************
*/
/*
const hobbies = ["Sports", "Coding", "Movie"];
const hobbiesClone = [...hobbies];

const person = {
  username: "Habeeb",
  age: 24,
  greet: function () {
    console.log(`Hi, i am ${this.username}`);
  },
};
const personClone = { ...person };
console.log(hobbiesClone, personClone);
*/

/*
****************
spread and rest operator:
rest operator, use for accepting unknown number of argument and bundle
them into an array. this is best use with functions.
this behaviour can be seen in vanilla js, while accessing the 'arguments'
object, but this cannot be accessed using es6, so rest operator is used to make up
for it.
****************
*/

/*
vanilla js
 */
/*
const toArray = function(){
  return arguments;
};

console.log(toArray(1, 2, 3));
*/

/*
es6
 */

/*
const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3));
*/

/*
****************
Destructuring 
****************
*/
/*
const person = {
  username: "Habeeb",
  age: 24,
  greet: function () {
    console.log(`Hi, i am ${this.username}`);
  },
};
*/
/*before destructuring */
/*
const printName = personData => {
  return personData.username;
};
*/
/*after destructuring*/
/*
const printData = ({ username }) => {
  return username;
};
console.log(printName(person), printData(person));
*/

/*or something like this*/

/*
const { username, age } = person;
console.log(username, age);
*/

/*
Destructuring of Array
you can use any var name to store them but for Object destructuring,
you need to destructure using property name.
 */
/*
const hobbies = ["Sports", "Coding", "Movie"];

const [hobby1, hobby2, hobby3] = hobbies;
console.log(hobby1, hobby2, hobby3);
*/

/*
***************
Async Code & Promises
***************
*/

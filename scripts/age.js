var birth = new Date('2000-07-04');
var now = new Date();
var difference = now - birth;
// Dates are set from 1970, so remove that to get the year 
var age = new Date(difference).getFullYear() - 1970

var span = document.getElementById('age');
span.innerHTML = age;
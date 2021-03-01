import $ from 'jquery'

import '../css/vendor.css'
import '../css/global.css'


console.log('hola soy console log')

$('body').append('Testing Javascript')


function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log('hola soy numbers', sum(...numbers));




if (import.meta.hot) {
  import.meta.hot.accept()
}
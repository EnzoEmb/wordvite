// import {hola} from './myfunction';
import $ from 'jquery'
import '../css/global.css'
// import 'vite/dynamic-import-polyfill'

// hola();

// $('body').append('<h1>hola</h1>')
// var container = document.getElementById("container");
// var content = document.createElement("span");
// content.style.color = "red";
// content.innerHTML = "Hello asd000aa";
// container.appendChild(content);
// $('body').append('hpla');
// $('body').append('asdasd');
// $('body').append('asdasdasdasd');
// $('body').append('0123456 asdasd asdasd asdasd');
console.log('hola soy console log')


function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log('hola soy numbers', sum(...numbers));


// $.ajax({
//   type: "POST",
//   url: AJAX_URL,
//   data: {
//     action: 'MY_AJAX_ACTION',
//     nonce_data: MY_AJAX_NAME,
//   },
//   success: function (data) {
//     $('body').append(data);
//   },
// });




if (import.meta.hot) {
  import.meta.hot.accept()
}
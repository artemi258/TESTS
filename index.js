import './style.scss';
// import {pizza} from './JSON/product.json';

const main = document.querySelector('.main');
const form = document.querySelector('form');

document.body.appendChild(main)
// console.log(pizza);

// form.addEventListener('submit', async (e) => {
// e.preventDefault();
//     const submit = await fetch('./JSON/product.json');
//    const data = await submit.json()
//    console.log( data)
//    data
//    .then(res => console.log(res))
// //    data.then(data => console.log(data))
// //    .catch(data => console.log(data))
// })


const fet = async (url) => {
    const submit = await fetch(url);
    const data = await submit.json();
    return data;
}

form.addEventListener('submit', (e) => {
e.preventDefault();
    fet('./JSON/product.json')
    .then(res => console.log('not ERROR',res))
    .catch(data => console.log('error', data));
})

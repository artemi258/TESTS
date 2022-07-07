import './style.scss';
// import {pizza} from './JSON/product.json';

import './newIndex';

const main = document.querySelector('.main');
const form = document.querySelector('form');

document.body.appendChild(main)

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

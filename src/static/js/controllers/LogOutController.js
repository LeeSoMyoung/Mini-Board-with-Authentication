'use strict';

export default function onLogOutBtnClicked(event){
    event.preventDefault();
    
    const nav__bar = document.querySelector('nav');
    const HIDDEN_CLASS_NAME = 'hidden';
    
    fetch('http://localhost:3000/logout');

    nav__bar.classList.add(HIDDEN_CLASS_NAME);
    
    location.reload();
}
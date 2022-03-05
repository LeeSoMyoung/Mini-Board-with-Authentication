'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('작성 게시물 목록');
    }

    async getHtml(){
        return `
            <h1></h1>
        `;
    }

    attachEvent(){
        const nav__bar = document.querySelector('nav');
        const HIDDEN_CLASS_NAME = 'hidden';

        nav__bar.classList.remove(HIDDEN_CLASS_NAME);
    }
}
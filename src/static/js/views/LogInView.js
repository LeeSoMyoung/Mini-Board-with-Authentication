'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    
    constructor(){
        super();
        this.setTitle('로그인하기');
    }

    async getHtml(){
        return `<h1>로그인</h1>`;
    }

    attachEvent(){
        
    }
}
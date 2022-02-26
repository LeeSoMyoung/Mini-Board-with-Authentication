'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('메인 화면');
    }

    async getHtml(){
        return `
            <h1>메인 화면</h1>
        `;
    }

    attachEvent(){
        
    }
}
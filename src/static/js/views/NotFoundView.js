'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    
    constructor(){
        super();
        this.setTitle('존재하지 않는 페이지입니다.');
    }

    async getHtml(){

    }

    attachEvent(){
        
    }
}
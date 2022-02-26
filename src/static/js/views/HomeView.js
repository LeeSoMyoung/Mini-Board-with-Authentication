'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params){
        super(params);
        this.setTitle('게시물');
    }

    async getHtml(){
        return `
        <h1>게시물 리스트 </h1>
        
        `;
    }

    attachEvent(){

    }

}
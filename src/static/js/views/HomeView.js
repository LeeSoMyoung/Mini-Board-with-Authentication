'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params){
        super(params);
        this.setTitle('게시물');
    }

    async getHtml(){
        return `
        <table class="table">
            
        </table>
        
        `;
    }

    attachEvent(){

    }

}
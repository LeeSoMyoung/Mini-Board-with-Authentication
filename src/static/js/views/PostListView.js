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
}
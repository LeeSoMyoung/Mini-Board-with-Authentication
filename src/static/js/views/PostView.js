'use strict';

import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml(){
        return `<h1>게시물 뷰</h1>`;
    }
}
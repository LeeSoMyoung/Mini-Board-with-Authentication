'use strict';

import AbstractView from "./AbstractView.js";

import { getList } from "../controllers/WrittenController.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('작성 게시물 목록');
    }

    async getHtml(){
        return `
            <div id="div__list-container"></div>
        `;
    }

    attachEvent(){
        const nav__bar = document.querySelector('nav');
        const HIDDEN_CLASS_NAME = 'hidden';
        const uid = location.pathname.replace('/written/','');
        const container = document.querySelector('#div__list-container');

        nav__bar.classList.remove(HIDDEN_CLASS_NAME);

        getList(uid, container);
    }
}
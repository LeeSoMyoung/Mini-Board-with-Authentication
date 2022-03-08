'use strict';

import AbstractView from "./AbstractView.js";

import { getUserInfo } from "../controllers/UserInfoContorller.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('메인 화면');
    }

    async getHtml(){
        return `
            <h1 id="h1__curent-user"></h1>
            <div id="div__user-info"></div>
        `;
    }

    async attachEvent(){
        const nav__bar = document.querySelector('nav');
        const HIDDEN_CLASS_NAME = 'hidden';

        const currentUser = document.querySelector('#h1__current-user');
        const div__userInfo = document.querySelector('#div__user-info');

        nav__bar.classList.remove(HIDDEN_CLASS_NAME);

        await getUserInfo(div__userInfo, currentUser);
    }
}
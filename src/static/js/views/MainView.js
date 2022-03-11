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
            <div id="div__user-info">
                <h3 id="h3__user-id"></h3>
                <button id="btn__getPosts">작성한 글 목록</button>
            </div>
        `;
    }

    async attachEvent(){
        const nav__bar = document.querySelector('nav');
        const HIDDEN_CLASS_NAME = 'hidden';

        const currentUser = document.querySelector('h1');
        const user_id = document.querySelector('#h3__user-id');
        const btn__getPosts = document.querySelector('#btn__getPosts');

        nav__bar.classList.remove(HIDDEN_CLASS_NAME);

        await getUserInfo(user_id, currentUser, btn__getPosts);

    }
}
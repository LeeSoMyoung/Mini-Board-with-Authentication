'use strict';

import AbstractView from "./AbstractView.js";

import { onSubmitBtnClick } from "../controllers/PostController.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('글 작성하기');
    }

    async getHtml(){
        return `
            <div class="input__write">
                <input class="post" id="title" type="text" placeholder="제목을 입력하세요.">
                <input class="post" id="contents" type="text" placeholder="게시글 내용을 입력하세요.">
            </div>
            <button id="submit-post">등록하기</button>
        `;
    }

    attachEvent(){
        const submitPostBtn = document.querySelector('#submit-post');
        const nav__bar = document.querySelector('nav');
        const HIDDEN_CLASS_NAME = 'hidden';

        const title = document.querySelector('#title');
        const content = document.querySelector('#contents');

        nav__bar.classList.remove(HIDDEN_CLASS_NAME);

        submitPostBtn.addEventListener('click',(event)=>{
            onSubmitBtnClick(event, title.value, content.value);
        });
    }
}
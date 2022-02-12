'use strict';

import AbstractView from "./AbstractView.js";

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
    }
}
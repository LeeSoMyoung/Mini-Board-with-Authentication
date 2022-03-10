'use strict';

import AbstractView from "./AbstractView.js";

import { setPreviousPost, onModifySubmit } from '../controllers/ModifyController.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('게시물 수정');
    }

    async getHtml(){
        return `
         <div class="input__write">
                <input class="post" id="input__modify-title" type="text" placeholder="제목을 입력하세요.">
                <input class="post" id="input__modify-contents" type="text" placeholder="게시글 내용을 입력하세요.">
            </div>
            <button id="submit-modify">수정하기</button>
        `;
    }

    attachEvent(){
        const pid = location.pathname.replace('/write/','');

        const modifyTitle = document.querySelector('#input__modify-title');
        const modifyContent = document.querySelector('#input__modify-contents');
        const submitModify = document.querySelector('#submit-modify');

        submitModify.addEventListener('click', (event)=>{
            onModifySubmit(event, pid, modifyTitle.value, modifyContent.value);
        });
    }
}
'use strict';

import { getPostDetail } from "../controllers/PostController.js";
import { onModifyBtnClicked, onPostListBtnClicked, onGoPreviousBtnClicked } from '../controllers/PostDetailController.js';
import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml(){
        return `
            <div id="div__post-detail"></div>
            <div id="div__post-detail-btns>
                <button id="btn__go-dashboard">게시물 리스트로 이동</button>
                <button id="btn__previous">이전 페이지로 이동</button>
                <button id="btn__modify">게시물 수정하기</button>
            </div>
        `;
    }

    async attachEvent(){
        const pid = location.pathname.replace('/dashboard/','');
        const div__postView = document.querySelector('#div__post-detail');
        const btn__goDashBoard = document.querySelector('#btn__go-dashboard');
        const btn__modify = document.querySelector('#btn__modify');
        const btn__previous = document.querySelector('#btn__previous');

        await getPostDetail(pid, div__postView);

        btn__modify.addEventListener('click', (event)=>{
            onModifyBtnClicked(event,pid);
        });
        btn__goDashBoard.addEventListener('click', onPostListBtnClicked);
        btn__previous.addEventListener('click', onGoPreviousBtnClicked);
    }
}
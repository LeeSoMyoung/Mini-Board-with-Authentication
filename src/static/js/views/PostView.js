'use strict';

import { getPostDetail } from "../controllers/PostController.js";
import { onModifyBtnClicked, onPostListBtnClicked, onGoPreviousBtnClicked, onDeleteBtnClicked } from '../controllers/PostDetailController.js';
import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml(){
        return `
            <div id="div__post-detail"></div>
            <div id="div__post-detail-btns">
                <button id="btn__go-dashboard">게시물 리스트로 이동</button>
                <button id="btn__previous">이전 페이지로 이동</button>
                <button id="btn__modify">수정</button>
                <button id="btn__delete">삭제</button>
            </div>
        `;
    }

    async attachEvent(){
        const pid = location.pathname.replace('/dashboard/','');
        const div__postView = document.querySelector('#div__post-detail');
        const btn__goDashBoard = document.querySelector('#btn__go-dashboard');
        const btn__modify = document.querySelector('#btn__modify');
        const btn__previous = document.querySelector('#btn__previous');
        const btn__delete = document.querySelector('#btn__delete');

        await getPostDetail(pid, div__postView);

        btn__modify.addEventListener('click', (event)=>{
            onModifyBtnClicked(event,pid);
        });

        btn__delete.addEventListener('click', (event)=>{
            onDeleteBtnClicked(event, pid);
        });

        btn__goDashBoard.addEventListener('click', onPostListBtnClicked);
        btn__previous.addEventListener('click', onGoPreviousBtnClicked);
    }
}
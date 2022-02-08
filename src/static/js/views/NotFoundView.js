'use strict';

import AbstractView from "./AbstractView.js";
import { onHomeBtnClick, onPreviousBtnClick } from '../controllers/NotFoundController.js';

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('존재하지 않는 페이지입니다.');
    }

    async getHtml() {
        return `
        <h1>존재하지 않는 페이지입니다.</h1>
        <h2>경로를 다시 확인해주세요.</h2>
        <div class="btns">
            <button id="goHome">홈 화면으로 이동</button>
            <button id="goPrevious">이전 화면으로 이동</button>
        </div>
        `
    }

    attachEvent() {
        const goHomeBtn = document.querySelector('#goHome');
        const goPreviousBtn = document.querySelector('#goPrevious');

        goHomeBtn.addEventListener('click', onHomeBtnClick);
        goPreviousBtn.addEventListener('click', onPreviousBtnClick);
    }
}
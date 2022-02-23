'use strict';

import AbstractView from "./AbstractView.js";
import { onSignUpBtnClick, onSignInSubmit } from "../controllers/LogInController.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle('로그인하기');
    }

    async getHtml() {
        return `
        <div class="container">
            <form class="form" id="login">
                <h1 class="form__title">로그인 하기</h1>
                <div class="form__message form__message--error"></div>
                <div class="form__input-group">
                    <input type="text" class="form__input" id="id" autofocus placeholder="아이디">
                    <div class="form__input-error-message"></div>
                </div>
                <div class="form__input-group">
                    <input type="password" id="pw" class="form__input" autofocus placeholder="비밀번호">
                    <div class="form__input-error-message"></div>
                </div>
                <button class="form__button" type="submit" id="login-btn">로그인</button>
                <button class="form__button" type="submit" id="signup-btn">회원가입</button>
            </form>
        </div>
        `;
    }

    attachEvent() {
        const login_btn = document.querySelector('#login-btn');
        const signUp_btn = document.querySelector('#signup-btn');
        const login_form = document.querySelector('#login');

        //// input 값들
        const id = document.querySelector('#id');
        const pw = document.querySelector('#pw');

        signUp_btn.addEventListener('click', onSignUpBtnClick);
        login_btn.addEventListener('click', (event) => {
            onSignInSubmit(event, id.value, pw.value);
        });
        login_form.addEventListener('submit', (event) => {
            onSignInSubmit(event, id.value, pw.value);
        });
    }
}
'use strict';

import AbstractView from "./AbstractView.js";
import { onSignUpConfirmClick } from "../controllers/SignUpController.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle('회원가입');
    }

    async getHtml(){
        return `
        <div class="container">
            <form class="form" id="sign-up">
                <h1 class="form__title">회원가입 하기</h1>
                <div class="form__message form__message--error"></div>
                <div class="form__input-group">
                    <input type="text" class="form__input" id="username" autofocus placeholder="닉네임">
                    <input type="text" class="form__input" id="id" autofocus placeholder="아이디">
                    <div class="form__input-error-message"></div>
                    <input type="password" class="form__input" id="pw" autofocus placeholder="비밀번호">
                    <div class="form__input-error-message"></div>
                    <input type="password" class="form__input" id="pw_repeat" autofocus placeholder="비밀번호 확인">
                    <div class="form__input-error-message"></div>
                </div>
                <button class="form__button" type="submit" id="signup-confirm">회원가입</button>
            </form>
        </div>
        `;
    }

    attachEvent(){
        const signUp = document.querySelector('#signup-confirm');

        //// html input들
        const id = document.querySelector('#id');
        const pw = document.querySelector('#pw');
        const pw_repeat = document.querySelector('#pw_repeat');
        const username = document.querySelector('#username');

        signUp.addEventListener('click', (event)=>{
            onSignUpConfirmClick(event, username.value, id.value, pw.value, pw_repeat.value);
        });
    }
}
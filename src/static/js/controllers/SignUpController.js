'use strict';

import { navigateTo } from "../routes/router.js";

function onSignUpConfirmClick(event) {
    event.preventDefault();
    // TODO : 회원 정보 POST 하는 로직 필요
    navigateTo(location.origin + '/login');
}

function postSignUp(req,res){

}

export { onSignUpConfirmClick, postSignUp };
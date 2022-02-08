'use strict';

import { navigateTo } from '../routes/router.js';

function onSignUpBtnClick(event) {
    event.preventDefault();
    navigateTo(location.origin + '/signup');
}

function onSignInSubmit(event){
    event.preventDefault();
}

export { onSignUpBtnClick, onSignInSubmit };
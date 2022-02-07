'use strict';

import { navigateTo } from '../routes/router.js';

function onSignUpBtnClick(event) {
    event.preventDefault();
    navigateTo(location.origin + '/signup');
}

export { onSignUpBtnClick };
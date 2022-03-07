'use strict';

import { navigateTo } from '../routes/router.js';

function onSignUpBtnClick(event) {
    event.preventDefault();
    navigateTo(location.origin + '/signup');
}

function onSignInSubmit(event, id, pw) {
    event.preventDefault();

    const nav__bar = document.querySelector('nav');
    const HIDDEN_CLASS_NAME = 'hidden';

    const signInPath = `${location.origin}/login`;

    fetch(signInPath, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "id": id,
            "pw": pw
        })
    })
        .then((res) => {
            if (res.ok && res.status === 200) {
                const origin = location.origin;
                navigateTo(origin);
                nav__bar.classList.remove(HIDDEN_CLASS_NAME);
            }
            else {
                return res.json().then((message) => {
                    alert(message.message);
                    throw message;
                })
            }
        })
        .catch((err) => {
            throw err;
        });
}

export { onSignUpBtnClick, onSignInSubmit };
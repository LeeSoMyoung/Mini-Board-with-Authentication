'use strict';

import { navigateTo } from '../routes/router.js';

function onSignUpBtnClick(event) {
    event.preventDefault();
    navigateTo(location.origin + '/signup');
}

function onSignInSubmit(event, id, pw) {
    event.preventDefault();
    fetch('http://localhost:3000/login', {
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
                navigateTo('http://localhost:3000');
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
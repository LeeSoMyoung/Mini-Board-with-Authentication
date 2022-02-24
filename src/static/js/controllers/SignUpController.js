'use strict';

import { navigateTo } from "../routes/router.js";

function onSignUpConfirmClick(event, username, id, pw, pw_repeat) {
    event.preventDefault();

    fetch('http://localhost:3000/signup', {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id,
            "pw": pw,
            "username": username,
            "pw_repeat": pw_repeat
        })
    })
        .then((res) => {
            if(res.ok && res.status === 201){
                navigateTo(location.origin+'/login');
                return 
            }
            else{
                // 로그인에 실패하면
               return res.json().then((result)=>{
                   alert(result.message);
               });
            }
        })
        .catch((err) => {
            throw new Error(err.message);
        });

    navigateTo(location.origin + '/login');
}

export { onSignUpConfirmClick };
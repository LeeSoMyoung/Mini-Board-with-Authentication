'use strict';

import { navigateTo } from "../routes/router";

const onSubmitBtnClick = (event, title, content) => {
    event.preventDefault();

    fetch(
        'http://localhost:3000/write',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "title": title,
                "content": content
            }
        }
    ).then((res) => {
        if(res.ok && res.status === 201){
            console.log(res);
            navigateTo(location.origin);
        }
        else{
            res.json().then((result)=>{
                alert(result.message);
            });
        }
    })
        .catch((err) => {
            throw err;
        })
}

export { onSubmitBtnClick };
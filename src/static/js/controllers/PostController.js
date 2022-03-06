'use strict';

import { navigateTo } from "../routes/router.js";

const onSubmitBtnClick = (event, title, content) => {
    event.preventDefault();

    fetch(
        'http://localhost:3000/write',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "content": content
            })
        }
    ).then((res) => {
        if(res.ok && res.status === 201){
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

const getPost = async (pid) =>{
    await fetch(`http://localhost:3000/${pid}`)
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        throw err;
        console.log(err);
    });
};

export { onSubmitBtnClick, getPost };
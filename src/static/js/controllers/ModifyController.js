'use strict';

import { navigateTo } from "../routes/router.js";

const setPreviousPost = async (event, pid, title, post) => {
    event.preventDefault();

    const currentURL = `${location.origin}/dashboard/pid`;

    await fetch(currentURL)
        .then((data) => {

        })
        .catch((err) => {
            throw err;
        });
}

const onModifySubmit = async (event, pid, title, content) => {
    event.preventDefault();

    const currentURL = `${location.origin}/write/${pid}`;
    const fetchInit = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "title": title,
            "content": content,
            "pid": pid
        })
    };

    await fetch(currentURL, fetchInit)
        .then((res) => {
            console.log(res);
            if (res.ok && res.status === 200) {
                const postDetailURL = `${location.origin}/dashboard/${pid}`;

                navigateTo(postDetailURL);
            }
        })
        .catch((err) => {
            throw err;
        });
}

export { setPreviousPost, onModifySubmit };
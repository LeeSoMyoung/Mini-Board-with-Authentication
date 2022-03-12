'use strict';

import { navigateTo } from "../routes/router.js";

const setPreviousPost = async (pid, titleContainer, contentContainer) => {

    const currentURL = `${location.origin}/dashboard/${pid}`;

    await fetch(currentURL)
        .then((res) => {
            res.json().then((data) => {

                const uid = data.currentPost.uid;
                const userInfo = `${location.origin}/user-info`;

                fetch(userInfo).then((res) => {
                    res.json().then((userData) => {
                        const authorUid = userData.userInfo.uid;

                        if (uid === authorUid) {
                            const title = data.currentPost.title;
                            const content = data.currentPost.content;

                            titleContainer.value = title;
                            contentContainer.value = content;
                        }
                        else {
                            alert('수정 권한이 없습니다.');

                            navigateTo(currentURL);
                        }

                    });
                })
                    .catch((err) => {
                        throw err;
                    });

            });
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
        body: JSON.stringify({
            "title": title,
            "content": content,
            "pid": pid
        })
    };

    await fetch(currentURL, fetchInit)
        .then((res) => {
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
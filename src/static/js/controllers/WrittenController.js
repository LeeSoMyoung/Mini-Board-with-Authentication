'use strict';

import { navigateTo } from "../routes/router.js";

const getList = async (uid, div__list) => {

    const getUserURL = `${location.origin}/written/${uid}`;

    await fetch(getUserURL)
        .then((res) => {
            res.json().then((data) => {
                const postList = data.postList;

                postList.forEach((post)=>{
                    const pid = post.pid;
                    const title = post.title;

                    const li = getLiElement(title);

                    li.addEventListener('click', (event)=>{
                        onWrittenTitleClicked(event,pid);
                    });

                    div__list.appendChild(li);
                });

            });
        })
        .catch((err) => {
            throw err;
        });
};

const onWrittenListClicked = (event, uid) => {
    event.preventDefault();

    const writtenURL = `${location.origin}/written/${uid}`;

    navigateTo(writtenURL);
};

const onWrittenTitleClicked = (event, pid) =>{
    event.preventDefault();
    
    const postURL = `${location.origin}/dashboard/${pid}`;

    navigateTo(postURL);
}

const getLiElement = (value) =>{
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.innerText = value;

    li.append(span);

    return span;
}

export { getList, onWrittenListClicked, getLiElement };
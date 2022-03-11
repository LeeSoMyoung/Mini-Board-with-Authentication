'use strict';

import { onWrittenListClicked } from "./WrittenController.js";

const getUserInfo = async (user_id, h1__currentUser, btn__getPosts) => {
    const currentPath = `${location.origin}/user-info`;

    await fetch(currentPath)
        .then((res) => {
            res.json().then((data)=>{
                const userInfo = data.userInfo;
                const uid = userInfo.uid;
                
                h1__currentUser.innerText = `반갑습니다, ${userInfo.username}님`;
                user_id.innerText = `${userInfo.id}님의 방문을 환영합니다`;

                btn__getPosts.addEventListener('click', (event)=>{
                    onWrittenListClicked(event, uid);
                });
            });
        })
        .catch((err) => {
            throw err;
        });
}

export { getUserInfo };
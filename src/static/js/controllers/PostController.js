'use strict';

import { navigateTo } from "../routes/router.js";
import { getLiElement } from "./WrittenController.js";

const onSubmitBtnClick = (event, title, content) => {
    event.preventDefault();

    const writePath = `${location.origin}/write`;

    fetch(
        writePath,
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
        if (res.ok && res.status === 201) {
            const dashboard = `${location.origin}/dashboard`;

            navigateTo(dashboard);
        }
        else {
            res.json().then((result) => {
                alert(result.message);
            });
        }
    })
        .catch((err) => {
            throw err;
        })
}

const getPost = (pid) => {
    fetch(`http://localhost:3000/dashboard/${pid}`)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            throw err;
            console.log(err);
        });
};

const getPostList = async (div__postList) => {
    const postListPath = `${location.origin}/dashboard`;
    await fetch(postListPath)
        .then((data) => {
            data.json().then((posts) => {
                const lists = posts.postList;
                lists.forEach((post) => {

                    const li = getLiElement(post.title);

                    li.addEventListener('click', (event) => {
                        onPostTitleClicked(event, post.pid);
                    });

                    div__postList.appendChild(li);
                });
            });
        })
        .catch((err) => {
            throw err;
            console.log(err);
        });
}

const onPostTitleClicked = (event, pid) => {
    event.preventDefault();
    const currentPath = `${location.origin}/dashboard/${pid}`;
    navigateTo(currentPath);
}

const getPostDetail = async (pid, div__postView) => {
    const currentPath = `${location.origin}/dashboard/${pid}`;

    await fetch(currentPath)
        .then((data) => {
            data.json().then((post) => {

                const title= post.currentPost.title;
                const content = post.currentPost.content;
                const username = post.currentPost.username;

                const titleLi = getLiElement(title);
                const contentLi = getLiElement(content);
                const usernameLi = getLiElement(username);

                div__postView.appendChild(titleLi);
                div__postView.appendChild(usernameLi);
                div__postView.appendChild(contentLi);

            });
        })
        .catch((err) => {
            throw err;

        });
}

export { onSubmitBtnClick, getPost, getPostList, getPostDetail };
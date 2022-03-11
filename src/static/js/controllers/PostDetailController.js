'use strict';

import { navigateTo } from "../routes/router.js";

const onModifyBtnClicked = (event, pid) => {
    event.preventDefault();

    const modifyURL = `${location.origin}/write/${pid}`;

    navigateTo(modifyURL);
}

const onPostListBtnClicked = (event) => {
    event.preventDefault();

    const dashboardURL = `${location.origin}/dashboard`;
    navigateTo(dashboardURL);
}

const onGoPreviousBtnClicked = (event) => {
    history.back();
}

const onDeleteBtnClicked = async (event, pid) =>{
    event.preventDefault();

    const currentURL = `${location.origin}/dashboard/${pid}`;
    const fetchInit = {
        method:'DELETE'
    };

    await fetch(currentURL,fetchInit)
    .then((res)=>{
        if(res.ok&&res.status===200){
            const dashboardURL = `${location.origin}/dashboard`;

            navigateTo(dashboardURL);
        }
    })
    .catch((err)=>{
        throw err;
    });
}

export { onModifyBtnClicked, onPostListBtnClicked, onGoPreviousBtnClicked, onDeleteBtnClicked };
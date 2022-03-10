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

export { onModifyBtnClicked, onPostListBtnClicked, onGoPreviousBtnClicked };
'use strict';

import { navigateTo } from "../routes/router.js";

function onHomeBtnClick(event) {
    event.preventDefault();
    // 홈 화면으로 이동하는 버튼
    navigateTo(location.origin);
}

function onPreviousBtnClick() {
    // 이전 화면으로 이동
    // 다른 origin에서 유입되었을 수도 있으므로
    // 새로고침을 막지 않고 history API를 사용
    history.back();
}

export { onHomeBtnClick, onPreviousBtnClick };
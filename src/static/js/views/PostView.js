'use strict';

import { getPostDetail } from "../controllers/PostController.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml(){
        return `
            <div id="div__post-detail"></div>
        `;
    }

    async attachEvent(){
        const pid = location.pathname.replace('/dashboard/','');
        const div__postView = document.querySelector('#div__post-detail');

        await getPostDetail(pid, div__postView);
    }
}
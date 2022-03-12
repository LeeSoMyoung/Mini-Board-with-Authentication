'use strict';

import AbstractView from "./AbstractView.js";

import { getPostList } from '../controllers/PostController.js';

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle('게시물 목록');
    }

    async getHtml() {
        return `
            <div class="titles" id="div__post-list">
            </div>
        `;
    }

    async attachEvent() {
        const div__postList = document.querySelector('#div__post-list');

        await getPostList(div__postList);
        
    }
}
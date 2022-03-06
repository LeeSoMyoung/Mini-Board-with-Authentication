'use strict';

import AbstractView from "./AbstractView.js";
import { getPost } from "../controllers/PostController.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml(){
        return `<h1>게시물 뷰</h1>`;
    }

    async attachEvent(){
        console.log(params);
        const currentPost = await getPost(params);
        console.log(currentPost);
    }
}
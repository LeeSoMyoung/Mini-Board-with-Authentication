'use strict';

import LogInView from "../views/LogInView.js";
import HomeView from '../views/HomeView.js';
import NotFoundView from '../views/NotFoundView.js';
import SignUpView from "../views/SignUpView.js";
import WriteView from '../views/WriteView.js';
import PostView from "../views/PostView.js";

const pathToRegex = (path) => new RegExp('^'+path.replace(/\//g, '\\/').replace(/:\w+/g,"(.+)")+"$");

const getParams = (match)=>{
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result)=>result[1]);

    return Object.fromEntries(keys.map((key,i)=>{
        return [key, values[i]];
    }));
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: '/login', view: LogInView },
        { path: '/', view: HomeView },
        { path: '/signup', view: SignUpView },
        { path: '/:pid', view: PostView },
        { path: '/write', view: WriteView }
    ];

    const pathList = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let matchedPath = pathList.find((path) => path.result !== null);

    console.log(matchedPath);

    if (!matchedPath) {
        // 해당되는 path가 존재하지 않으면
        matchedPath = {
            route: {
                path: location.pathname,
                view: NotFoundView
            },
            result: origin+location.pathname
        };
    }

    const view = new matchedPath.route.view(getParams(matchedPath));

    const app = document.querySelector('#app');

    app.innerHTML = await view.getHtml();

    view.attachEvent();
}

export { navigateTo, router };
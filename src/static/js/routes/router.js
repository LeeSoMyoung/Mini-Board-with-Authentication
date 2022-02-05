'use strict';

import LogInView from "../views/LogInView.js";
import HomeView from '../views/HomeView.js';
import NotFoundView from '../views/NotFoundView.js';

const navigateTo = (url)=>{
    history.pushState(null,null,url);
    router();
}

const router = async () =>{
    const routes = [
        {path:'/login', view:LogInView},
        {path:'/', view:HomeView}
    ];

    const pathList = routes.map((route)=>{
        return {
            route: route,
            isMatch: location.pathname===route.path
        };
    });

    let matchedPath = pathList.find((path)=>path.isMatch);

    if(!matchedPath){
        // 해당되는 path가 존재하지 않으면
        matchedPath={
            route: {
                path:location.pathname,
                view: NotFoundView
            },
            isMatch: true
        };
    }
    
    const view = new matchedPath.route.view();

    const app = document.querySelector('#app');

    app.innerHTML = await view.getHtml();

    view.attachEvent();
}

export {navigateTo, router};
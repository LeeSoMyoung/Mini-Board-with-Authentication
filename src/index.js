'use strict';

import { router, navigateTo } from './static/js/routes/router.js';

window.addEventListener('popstate',router);
document.addEventListener('DOMContentLoaded', ()=>{
    document.body.addEventListener('click',(event)=>{
        if(event.target.matches('[data-link]')){
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });
    router();
});
'use strict';

import { router, navigateTo } from './static/js/routes/router.js';

window.addEventListener('popstate',router);
document.addEventListener('DOMContentLoaded', ()=>{
    router();
});
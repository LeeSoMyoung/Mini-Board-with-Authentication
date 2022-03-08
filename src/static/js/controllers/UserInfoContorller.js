'use strict';

const getUserInfo = async (div__userInfo, h1__currentUser) => {
    const currentPath = `${location.origin}`;

    await fetch(currentPath)
        .then((res) => {
            res.json().then((data)=>{
                console.log(data);
            });
        })
        .catch((err) => {
            throw err;
        });
}

export { getUserInfo };
// async function userAdmin() {
//     const res = await fetch(API + '/user_admin', {
//         headers: {
//             'Authorization': localStorage.getItem('googleToken')
//         },
//     })
//     const userAdmin = await res.json();
    
//     return userAdmin;
// }

async function main() {
    // const googleToken = localStorage.getItem('googleToken');  
    // if (!googleToken) {
    //     window.location = '/';
    // } else {
    //     const isAdmin = await userAdmin()
    //     if (!isAdmin) {
    //         window.location = '/';
    //     }
    // }
    const res = await fetch(API + '/api/v1/user', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const users = await res.json();
    var html = `
        <div class="row">
            <div class="col-1">index</div>
            <div class="col-2">userId</div>
            <div class="col-3">email</div>
            <div class="col-2">created</div>
            <div class="col-1">aliasCount</div>
            <div class="col-1">mailCount</div>
            <div class="col-2">
                operations
            </div>
        </div>`
    users.forEach((user, i) => {
        html += ` 
            <div class="row">
                <div class="col-1">${i+1}</div>
                <div class="col-2">${user.userId}</div>
                <div class="col-3">${user.email}</div>
                <div class="col-2">${user.created}</div>
                <div class="col-1">${user.aliasCount}</div>
                <div class="col-1">${user.mailcount}</div>
                <div class="col-2">
                    <button id="edit-${i}">edit</button>
                    <button id="delete-${i}">delete</button>
                </div>
            </div>`
    });
    document.getElementById('usertable').innerHTML = html;
    // users.forEach((user, i) => {
    // // for (var i=0; i < users.length; i++) {
    //     document.getElementById(`edit-${i}`).addEventListener('click', async e => {
    //         window.location = `/user.html?id=${user._id}`;
    //     });
    //     document.getElementById(`delete-${i}`).addEventListener('click', async e => {
    //         window.location = `/user/delete.html?id=${user._id}`;
    //     });
    // });
}

main();
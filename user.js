var url = new URL(window.location.href);
var id = url.searchParams.get("id");

async function main() {
    const res = await fetch(API + `/api/v1/admin/user/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const user = await res.json();
    document.getElementById('user').innerHTML = JSON.stringify(user.data[0], null, 2);
    console.log(user.data[0]);
    document.getElementById('userId').innerHTML = user.data[0].userId;
    document.getElementById('signupTimestamp').innerHTML = user.data[0].created;
    document.getElementById('signupEmailAddress').innerHTML = user.data[0].email;
}

main();

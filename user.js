var url = new URL(window.location.href);
var id = url.searchParams.get("id");

async function main() {
    const res = await fetch(API + `/api/v1/admin/user/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const user = await res.json();
    document.getElementById('email').innerHTML = user.data[0].email;
}

main();

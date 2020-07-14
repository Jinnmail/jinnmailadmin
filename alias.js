var url = new URL(window.location.href);
var aliasId = url.searchParams.get("aliasId");

async function main() {
    const res = await fetch(API + `/api/v1/admin/alias/${aliasId}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const alias = await res.json();
    document.getElementById('alias').innerHTML = JSON.stringify(alias, null, 2);
}

main();
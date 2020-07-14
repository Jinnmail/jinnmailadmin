var url = new URL(window.location.href);
var aliasId = url.searchParams.get("aliasId");

async function main() {
    const res = await fetch(API + `/api/v1/admin/alias/${aliasId}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const alias = await res.json();
    document.getElementById('aliasId').innerHTML = alias.data[0].aliasId;
    document.getElementById('aliasAddress').innerHTML = alias.data[0].alias;
    document.getElementById('creationTimestamp').innerHTML = alias.data[0].created;
    document.getElementById('creationUrl').innerHTML = alias.data[0].refferedUrl;
    document.getElementById('rawAlias').innerHTML = JSON.stringify(alias, null, 2);
}

main();
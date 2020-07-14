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
    document.getElementById('userId').innerHTML = user.data[0].userId;
    document.getElementById('signupTimestamp').innerHTML = user.data[0].created;
    document.getElementById('signupEmailAddress').innerHTML = user.data[0].email;
    var html = `
        <thead>
            <th>Alias ID</th>
            <th>Alias address</th>
            <th>Active status</th>
            <th>Custom or Generated</th>
            <th>Receiving email address(es)</th>
            <th>Associated domain(s)</th>
            <th>Total emails sent through alias</th>
            <th>Total email replies to sender</th>
            <th>Timestamp most recent reply</th>
            <th>Timestamp most recent email opened</th>
        </thead>
        </tbody>`;
    user.data[0].aliases.forEach((alias) => {
        html += `
            <tr>
                <td>${alias.userId}</td>
                <td>${alias.alias}</td>
                <td>${alias.status}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `;
    })
    html += '</tbody>'
    document.getElementById('aliasesTable').innerHTML = html;
}

main();

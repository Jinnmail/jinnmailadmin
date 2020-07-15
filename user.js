var url = new URL(window.location.href);
var userId = url.searchParams.get("userId");

async function searchFunction2(query) {
    const res = await fetch(API + `/api/v1/admin/aliasSearch?query=${query}&userId=${userId}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    document.getElementById('aliasesTable').innerHTML = aliasesTableHeadHTML;
    const aliases = await res.json();
    fillAliasesTable(aliases.data);
}

const aliasesTableHeadHTML = `
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
    </tbody>
`;

async function fillAliasesTable(aliases) {
    var html = aliasesTableHeadHTML;
    aliases.forEach((alias, i) => {
        html += ` 
            <tr>
                <td>${alias.aliasId}</td>
                <td>${alias.alias}</td>
                <td>${alias.status}</td>
                <td><button id="details-${i}">details</button></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`
    });
    html += '</tbody>'
    document.getElementById('aliasesTable').innerHTML = html;
    aliases.forEach((alias, i) => {
        document.getElementById(`details-${i}`).addEventListener('click', async e => {
            window.location = `/alias.html?aliasId=${alias.aliasId}`
        });
    });
}

document.getElementById("aliasSearch").addEventListener("keydown", async e => {
    var query = document.getElementById("aliasSearch").value
    if (e.key === "Backspace") {
        query = query.substring(0, query.length - 1)
    } else if (e.keyCode === 13 || e.which == 13) {
        // do nothing, disables the enter key
    } else {
        query += e.key
    }
    if (query) {
        searchFunction2(query);
    } else {
        const res = await fetch(API + `/api/v1/admin/user/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        const user = await res.json();
        fillAliasesTable(user.data[0].aliases);
        // sortTable(0);
    }
});

async function main() {
    var query = document.getElementById('aliasSearch').value;
    if (query) {
        searchFunction2(query);
    } else {
        const res = await fetch(API + `/api/v1/admin/user/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        const user = await res.json();
        document.getElementById('userId').innerHTML = user.data[0].userId;
        document.getElementById('signupTimestamp').innerHTML = user.data[0].created;
        document.getElementById('signupEmailAddress').innerHTML = user.data[0].email;
        var aliasesTableHtml = aliasesTableHeadHTML;
        user.data[0].aliases.forEach((alias, i) => {
            aliasesTableHtml += `
                <tr>
                    <td>${alias.userId}</td>
                    <td>${alias.alias}</td>
                    <td>${alias.status}</td>
                    <td><button id="details-${i}">details</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        })
        aliasesTableHtml += '</tbody>'
        document.getElementById('aliasesTable').innerHTML = aliasesTableHtml;
        user.data[0].aliases.forEach((alias, i) => {
            document.getElementById(`details-${i}`).addEventListener('click', async e => {
                window.location = `/alias.html?aliasId=${alias.aliasId}`;
            });
        });

        var userEmailMessagesTableHtml = `
            <thead>
                <th>Email Message ID</th>
                <th>Sender email address</th>
                <th>Subject</th>
                <th>Alias</th>
                <th>Processed timestamp</th>
                <th>Sent/Held/Discarded status</th>
                <th>Sent timestamp</th>
                <th>alias ID</th>
                <th>alias email address</th>
                <th>Recipient email address(es)</th>
                <th>Opened/Unopened/Bounced</th>
                <th>Opened timestamp</th>
            </thead>
            </tbody>`;
        userEmailMessagesTableHtml += '</tbody>';
        document.getElementById('userEmailMessagesTable').innerHTML = userEmailMessagesTableHtml;

        var userEmailMessagesTableHtml2 = `
        <thead>
            <th>Email Message ID</th>
            <th>To email address(es)</th>
            <th>Subject</th>
            <th>Alias</th>
            <th>Processed timestamp</th>
            <th>Alias active/inactive at time of send</th>
            <th>Opened/Unopened/Bounced</th>
            <th>Opened timestamp</th>
        </thead>
        </tbody>`;
        userEmailMessagesTableHtml2 += '</tbody>';
        document.getElementById('userEmailMessagesTable2').innerHTML = userEmailMessagesTableHtml2;

        var marketingTableHtml = `
            <thead>
                <th>Referral URL</th>
                <th>Referral ID</th>
                <th>Signup IP</th>
                <th>Signup IP Geolocation City State & Country</th>
            </thead>
            </tbody>`;
        marketingTableHtml += '</tbody>';
        document.getElementById('marketingTable').innerHTML = marketingTableHtml;

        document.getElementById('rawData').innerHTML = JSON.stringify(user.data[0], null, 2);
    }
}

setTimeout(function() {
    main();
}, 100);

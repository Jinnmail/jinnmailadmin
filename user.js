var url = new URL(window.location.href);
var id = url.searchParams.get("id");

async function main() {
    const res = await fetch(API + `/api/v1/admin/user/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const user = await res.json();
    document.getElementById('userId').innerHTML = user.data[0].userId;
    document.getElementById('signupTimestamp').innerHTML = user.data[0].created;
    document.getElementById('signupEmailAddress').innerHTML = user.data[0].email;
    var aliasesTableHtml = `
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
        aliasesTableHtml += `
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
    aliasesTableHtml += '</tbody>'
    document.getElementById('aliasesTable').innerHTML = aliasesTableHtml;
    
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

main();

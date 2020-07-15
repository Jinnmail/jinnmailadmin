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
    var historyofActiveOrInactiveTogglesAndTimestampsTableHtml = `
        <thead>
            <th>Total emails sent through alias during active/inactive period</th>
            <th>Total emails held/discarded when inactive</th>
            <th>Total email replies to sender through alias during active/inactive period</th>
        </thead>
        </tbody>`;
    historyofActiveOrInactiveTogglesAndTimestampsTableHtml += '</tbody>';
    document.getElementById('historyofActiveOrInactiveTogglesAndTimestampsTable').innerHTML = historyofActiveOrInactiveTogglesAndTimestampsTableHtml;
    var listOfEmailMessagesProcessedToAliasTableHtml = `
    <thead>
        <th>Email Message ID</th>
        <th>Sender email address</th>
        <th>Subject</th>
        <th>Processed timestamp</th>
        <th>Send/Held/Discarded status</th>
        <th>Sent timestamp</th>
        <th>alias ID</th>
        <th>alias email address</th>
        <th>Recipient email address(es)</th>
        <th>Opened/Unopened/Bounced</th>
        <th>Opened timestamp</th>
    </thead>
    </tbody>`;
    listOfEmailMessagesProcessedToAliasTableHtml += '</tbody>';
    document.getElementById('listOfEmailMessagesProcessedToAliasTable').innerHTML = listOfEmailMessagesProcessedToAliasTableHtml;
    var listOfEmailRepliesToSenderFromAliasTableHtml = `
    <thead>
        <th>Email Message ID</th>
        <th>To email address(es)</th>
        <th>Subject</th>
        <th>Processed timestamp</th>
        <th>Alias active/inactive at time of send</th>
        <th>Opened/Unopened/Bounced</th>
        <th>Opened timestamp</th>
    </thead>
    </tbody>`;
    listOfEmailRepliesToSenderFromAliasTableHtml += '</tbody>';
    document.getElementById('listOfEmailRepliesToSenderFromAliasTable').innerHTML = listOfEmailRepliesToSenderFromAliasTableHtml;
    document.getElementById('rawAlias').innerHTML = JSON.stringify(alias, null, 2);
}

main();
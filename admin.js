// async function userAdmin() {
//     const res = await fetch(API + '/user_admin', {
//         headers: {
//             'Authorization': localStorage.getItem('googleToken')
//         },
//     })
//     const userAdmin = await res.json();
    
//     return userAdmin;
// }

document.getElementById("userSearch").addEventListener("keydown", e => {
    var query = document.getElementById("userSearch").value
    if (query) {
        if (e.key === "Backspace") {
            query = query.substring(0, query.length - 1)
        } else if (e.keyCode === 13) {
            // do nothing, disables the enter key
        } else {
            query += e.key
        }
        alert(query)
        // people_socket.people_filter(query)
    } else {
        // people_socket.list_people(1, 10)
    }
})

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
            <thead>
                <tr>
                    <th onclick="sortTable(0)">User ID</th>
                    <th>Signup Timestamp</th>
                    <th onclick="sortTable(2)">Signup email address</th>
                    <th>Operation</th>
                    <th>Total aliases</th>
                    <th>Active aliases</th>
                    <th>Total emails sent to user</th>
                    <th>Total email replies by user</th>
                    <th>Timestamp most recent email opened</th>
                    <th>Timestamp of last alias created</th>
                    <th>Total recipient email addresses</th>
                </tr>
            </thead>
            <tbody>` 
        
    users.forEach((user, i) => {
        html += ` 
                <tr>
                    <td>${user.userId}</td>
                    <td>${user.created}</td>
                    <td>${user.email}</td>
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

    document.getElementById('userTable').innerHTML = html;
    users.forEach((user, i) => {
        document.getElementById(`details-${i}`).addEventListener('click', async e => {
            window.location = `/user.html?id=${user.userId}`;
        });
    });
    sortTable(0);
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("userTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}

main();
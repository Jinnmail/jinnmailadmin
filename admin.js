function searchFunction(input) {
    var input, filter, table, tr, td, i, txtValue;
    filter = input.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

async function searchFunction2(query) {
    const res = await fetch(API + `/api/v1/admin/userSearch?query=${query}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    document.getElementById('userTable').innerHTML = userTableHeadHTML;
    const users = await res.json();
    fillUserTable(users.data);
}

const userTableHeadHTML = `
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
    <tbody>
`;

async function fillUserTable(users) {
    var html = userTableHeadHTML;
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
            window.location = `/user.html?userId=${user.userId}`;
        });
    });
}

document.getElementById("userSearch").addEventListener("keydown", async e => {
    var query = document.getElementById("userSearch").value
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
        const res = await fetch(API + '/api/v1/user', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        const users = await res.json();
        fillUserTable(users);
        sortTable(0);
    }
});

async function main() {
    var query = document.getElementById('userSearch').value;
    if (query) {
        searchFunction2(query);
    } else {
        const res = await fetch(API + '/api/v1/user', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        const users = await res.json();
        await fillUserTable(users);
        sortTable(0);
    }
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

setTimeout(function() {
    main();
}, 100);


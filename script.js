var flag = "create";
var selectedId;
async function postData() {
    try {
        var data = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value
        }

        if (flag == "create") {
            var postinfo = await fetch("https://60edb23d595894001714094e.mockapi.io/api/v1/user3", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            var resInfo = postinfo.json();
        }

        if(flag == "edit"){
            var postinfo = await fetch("https://60edb23d595894001714094e.mockapi.io/api/v1/user3" + selectedId, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            var resInfo = postinfo.json();
        }
        getData()
    } catch (error) {
        console.log(error)
    }
}

async function getData() {
    var data = await fetch("https://60edb23d595894001714094e.mockapi.io/api/v1/user3");
    var resp = await data.json();
    document.getElementById("datatable").innerText = "";
    resp.forEach(row => {
        var tr = document.createElement("tr");
        var nameTd = document.createElement("td");
        var ageTd = document.createElement("td");
        var actionTd = document.createElement("td");


        nameTd.innerText = row.name;
        ageTd.innerText = row.age;

        var editBtn = document.createElement("button");
        var delBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.setAttribute("onclick", "editData(" + row.id + ")")
        delBtn.innerText = "Delete";
        delBtn.setAttribute("onclick", "deleteData(" + row.id + ")")
        actionTd.appendChild(editBtn)
        actionTd.appendChild(delBtn)


        tr.appendChild(nameTd);
        tr.appendChild(ageTd);
        tr.appendChild(actionTd)
        document.getElementById("datatable").appendChild(tr);
    });
}

async function deleteData(id) {
    var deleteData = await fetch("https://60edb23d595894001714094e.mockapi.io/api/v1/user3" + id, {
        method: "DELETE"
    })
    var respDel = deleteData.json();
    getData()
}

async function editData(id) {
    // Fetch info from Server basedon iD
    var rowData = await fetch("https://60edb23d595894001714094e.mockapi.io/api/v1/user3" + id);
    var rowResp = await rowData.json();
    // Populate it in Form
    document.getElementById("name").value = rowResp.name;
    document.getElementById("age").value = rowResp.age;
    flag = "edit";
    selectedId = id;
}


getData()

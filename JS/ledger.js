
function izpis_vnosev() { //izpiše vse vnose uporabnika
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/ledger", true);	
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var table = document.getElementById("vnosiTable");

                // Clear existing table content
                table.innerHTML = "";

                // Create table header
                var header = table.createTHead();
                var row = header.insertRow();
                Object.keys(data[0]).forEach(function(key) {
                    var th = document.createElement("th");
                    th.textContent = key;
                    row.appendChild(th);
                });

                // Create table rows
                data.forEach(function(obj) {
                    var row = table.insertRow();
                    Object.values(obj).forEach(function(value) {
                        var cell = row.insertCell();
                        cell.textContent = value;
                    });
                });
            } else {
                // Handle error
                document.getElementById("oPrijavi").innerHTML = "Error fetching user data: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send();
}

function izpis_vnosev10() { //izpiše zadnjih 10 vnosov uporabnika
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/ledger", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var table = document.getElementById("vnosiTable");

                // Clear existing table content
                table.innerHTML = "";

                // Create table header
                var header = table.createTHead();
                var row = header.insertRow();
                Object.keys(data[0]).forEach(function (key) {
                    var th = document.createElement("th");
                    th.textContent = key;
                    row.appendChild(th);
                });

                // Create table rows
                var last10Inputs = data.slice(-10);
                last10Inputs.forEach(function (obj) {
                    var row = table.insertRow();
                    Object.values(obj).forEach(function (value) {
                        var cell = row.insertCell();
                        cell.textContent = value;
                    });
                });
            } else {
                // Handle error
                document.getElementById("oPrijavi").innerHTML = "Error fetching user data: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send();
}



function vnos() { //vnese nov vnos
    const formToJSON = elements => {
        if (!elements) {
            return {};
        }

        return [].reduce.call(elements, (data, element) => {
            if (element.name !== "") {
                if (!isNaN(element.value)) {
                    data[element.name] = parseFloat(element.value);
                } else {
                    data[element.name] = element.value;
                }
            }
            return data;
        }, {});
    };

    const data = formToJSON(document.getElementById("vnosForm").elements); // vsebino obrazca pretvorimo v objekt
    console.log(data);
    var JSONdata = JSON.stringify(data, null, "  "); // objekt pretvorimo v znakovni niz v formatu JSON
    console.log(JSONdata);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false; //zaradi CORSa
    xhr.open("POST", "http://localhost/mojProjekt/zaledje/APIji/ledger", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            if (xhr.status === 201) {
                console.log("vnos uspešen");
                document.getElementById("potrditev").innerHTML = "Vnos uspešno dodan";
                location.reload();
            } else {
                console.log("vnos neuspešen");
                document.getElementById("potrditev").innerHTML = "Error adding entry: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send(JSONdata);
}


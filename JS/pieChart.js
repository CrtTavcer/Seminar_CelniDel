function pieGraf() { //pridoni vnose uporabnika in jih prikaže v grafu
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/ledger", true);	
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                var filteredData = filterDataByCategoryPie(data, 'odhodek (-)'); // Filter by vrsta: "odhodek (-)"
                console.log(filteredData);
                // Create a graph using filteredData
                createPieGraph(filteredData);
            } else {
                // Handle error
                document.getElementById("oPrijavi").innerHTML = "Error fetching user data: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send();
}

function filterDataByCategoryPie(data, category) {
    // Filter data based on the specified category and calculate the sum
    var filteredData = data.filter(function(entry) {
        return entry.vrsta === category;
    });

    var sumByCategory = {};
    filteredData.forEach(function(entry) {
        var vsota = parseFloat(entry.vsota); // Convert vsota to a number
        var kategorija = entry.kategorija;
        if (sumByCategory[kategorija]) {
            sumByCategory[kategorija] += vsota;
        } else {
            sumByCategory[kategorija] = vsota;
        }
    });

    return sumByCategory;
}

function createPieGraph(data) {
    var labels = Object.keys(data);
    var values = Object.values(data);

    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var PieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Odhodki',
                data: values,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        }
    });
}
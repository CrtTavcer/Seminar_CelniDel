

function graf() { //izpiše vse vnose uporabnika
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/ledger", true);	
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                var filteredData = filterDataByCategory(data, 'odhodek (-)'); // Filter by vrsta: "odhodek (-)"
                console.log(filteredData);
                // Create a graph using filteredData
                createGraph(filteredData);
            } else {
                // Handle error
                document.getElementById("oPrijavi").innerHTML = "Error fetching user data: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send();
}

function filterDataByCategory(data, category) {
    // Filter data based on the specified category and calculate the sum
    var filteredData = data.filter(function(entry) {
        return entry.vrsta === category;
    });

    var sumByDate = {};
    filteredData.forEach(function(entry) {
        var vsota = parseFloat(entry.vsota); // Convert vsota to a number
        if (sumByDate[entry.datum]) {
            sumByDate[entry.datum] += vsota;
        } else {
            sumByDate[entry.datum] = vsota;
        }
    });

    return sumByDate;
}

function createGraph(data) {
    // Use Chart.js or any other graph library to create a graph
    // Example using Chart.js
    var labels = Object.keys(data);
    var values = Object.values(data);

    var ctx = document.getElementById('graf').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Odhodki',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red color
                borderColor: 'rgba(255, 99, 132, 1)', // Red color
                borderWidth: 1
            }]
        }
    });
}


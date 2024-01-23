function mesecnaBilanca() { // Funkcija za prikaz mesečne bilance v tabeli
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/bilanca", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Razčleni JSON odgovor
                var data = JSON.parse(xhr.responseText);
                // Pridobi telo tabele
                var tableBody = document.getElementById("monthlyTable").getElementsByTagName('tbody')[0];
                // Počisti obstoječo vsebino tabele
                tableBody.innerHTML = "";
                // Inicializiraj spremenljivke za vsoto
                var sumPrihodki = 0;
                var sumOdhodki = 0;
                // Iteriraj skozi podatke in posodobi tabelo
                data.forEach(function(entry) {
                    var row = tableBody.insertRow();
                    row.insertCell(0).textContent = new Date(entry.datum).toLocaleString('en-US', { month: 'short' });
                    row.insertCell(1).textContent = entry.vsota_prihodki; // Zaokroži na 2 decimalni mesti
                    row.insertCell(2).textContent = entry.vsota_odhodki; // Zaokroži na 2 decimalni mesti
                    // Izračunaj razliko med prihodki in odhodki
                    var razlika = (entry.vsota_prihodki - entry.vsota_odhodki).toFixed(2); // Zaokroži na 2 decimalni mesti
                    row.insertCell(3).textContent = razlika;
                    // Posodobi spremenljivke za vsoto
                    sumPrihodki += parseFloat(entry.vsota_prihodki);
                    sumOdhodki += parseFloat(entry.vsota_odhodki);
                });
                // Dodaj celico za vsoto
                var sumRow = tableBody.insertRow();
                sumRow.insertCell(0).textContent = "Vsota";
                sumRow.insertCell(1).textContent = sumPrihodki.toFixed(2);
                sumRow.insertCell(2).textContent = sumOdhodki.toFixed(2);
                sumRow.insertCell(3).textContent = (sumPrihodki - sumOdhodki).toFixed(2);
            } else {
                // Obdelaj napako
                document.getElementById("prikaz").innerHTML = "Napaka pri pridobivanju podatkov: " + xhr.status + " " + xhr.statusText;
            }
        }
    };
    xhr.send();
}
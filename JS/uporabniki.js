/*
JS funkcije za klicanje APIjev
*/

function podatki_uporabnika() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/mojProjekt/zaledje/APIji/uporabniki/vzdevek", true);	
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                var userData = JSON.parse(xhr.responseText);
                // Fill the form fields with the retrieved data
                document.getElementById("ime").value = userData.ime;
                document.getElementById("priimek").value = userData.priimek;
                document.getElementById("geslo").value = userData.geslo;
                document.getElementById("email").value = userData.email;
                // Hide loading indicator
                document.getElementById("prikaz").innerHTML = "";
            } else {
                // Handle error
                document.getElementById("prikaz").innerHTML = "Error fetching user data: " + xhr.status + " " + xhr.statusText;
            }
        }
    };

    xhr.send();
}


/*
funkcija za vstavlanje novega uporabnika
*/


const formToJSON = elements => [].reduce.call(elements, (data, element) => 
{
	if(element.name!="")
	{
		data[element.name] = element.value;
	}
  return data;
}, {});
 

/*
function posodobiUporabnika()
{
    const data = formToJSON(document.getElementById("obrazec").elements);	// vsebino obrazca pretvorimo v objekt
    var JSONdata = JSON.stringify(data, null, "  ");						// objekt pretvorimo v znakovni niz v formatu JSON
    
    var xmlhttp = new XMLHttpRequest();										// ustvarimo HTTP zahtevo
}
*/


function posodobiUporabnika(){
    
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
    
    
    
    const data = formToJSON(document.getElementById("obrazec").elements);	// vsebino obrazca pretvorimo v objekt
    var JSONdata = JSON.stringify(data, null, "  ");						// objekt pretvorimo v znakovni niz v formatu JSON
    
    var xmlhttp = new XMLHttpRequest();										// ustvarimo HTTP zahtevo
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("odgovor").innerHTML = "Posodabljanje uspelo!";
            setTimeout(function() {
                window.location.href = "login.html"; // Redirect after 3 seconds
            }, 3000);
        }
        if (this.readyState == 4 && this.status == 409) {
            document.getElementById("odgovor").innerHTML = "Uporabnik s tem vzdevkom že obstaja!";
        }
        if (this.readyState == 4 && this.status != 200) {
            document.getElementById("odgovor").innerHTML = "Posodabljanje ni uspelo!";
        }
    };
    xmlhttp.open("PUT", "http://localhost/mojProjekt/zaledje/APIji/uporabniki/vzdevek", true);							// določimo metodo in URL zahteve, izberemo asinhrono zahtevo (true)
    xmlhttp.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token"));
    xmlhttp.send(JSONdata);													// priložimo podatke in izvedemo zahtevo
}


function novUporabnik()
{
	const data = formToJSON(document.getElementById("obrazec").elements);	// vsebino obrazca pretvorimo v objekt
	var JSONdata = JSON.stringify(data, null, "  ");						// objekt pretvorimo v znakovni niz v formatu JSON
	
	var xmlhttp = new XMLHttpRequest();										// ustvarimo HTTP zahtevo
	 
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
        document.getElementById("odgovor").innerHTML = "Dodajanje uspelo!";
        setTimeout(function() {
            window.location.href = "login.html"; // Redirect after 3 seconds
        }, 3000);
    }
    if (this.readyState == 4 && this.status == 409) {
        document.getElementById("odgovor").innerHTML = "Uporabnik s tem vzdevkom že obstaja!";
    }
    if (this.readyState == 4 && this.status != 201) {
        document.getElementById("odgovor").innerHTML = "Dodajanje ni uspelo!";
    }
};
	 
	xmlhttp.open("POST", "http://localhost/mojProjekt/zaledje/APIji/novUporabnik.php", true);							// določimo metodo in URL zahteve, izberemo asinhrono zahtevo (true)
	xmlhttp.send(JSONdata);													// priložimo podatke in izvedemo zahtevo
}
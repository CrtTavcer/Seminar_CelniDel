function checkToken() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/mojProjekt/zaledje/JWT_check.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Authorization", "Bearer " + window.localStorage.getItem("access_token")); // Get JWT from browser storage
    //console.log(window.localStorage.getItem("access_token"));
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var vzdevek = response.vzdevek;
            var ID = response.ID;
            console.log('Vzdevek: ' + vzdevek);
            console.log('ID: ' + ID);
        } else {
            console.log('Error: ' + xhr.status);
        }
    };
    xhr.send();
}
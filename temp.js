    window.onload = function() {
        var temp = document.getElementById('temp');

        temp.onclick = function() {
            console.log("TEET");
            console.log(<%=
              rows.length
              %>);
            console.log(<%=
              rows[3].reason
              %>);
        }
    }

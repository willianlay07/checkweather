$(document).ready(() => {
    $("#searchBtn").click(() => {
        $("#resultWrp").empty();
        var searchLoc       = $("#searchLoc").val();

        if(searchLoc.length <= 0) {
            alert("Please enter the location!")
            $("#searchLoc").focus()
        } else {
            document.getElementById("resultWrp").style.color = "#000000";
            $("#resultWrp").append('Loading.....')
            fetch('/weather?address=' + searchLoc).then((response) => {
                response.json().then(( { error, forecast, locationName, address } = {}) => {
                    $("#resultWrp").empty();
                    if(error.length > 0) {
                        document.getElementById("resultWrp").style.color = "#FF0000";
                        $("#resultWrp").append(error)
                    } else {
                        document.getElementById("resultWrp").style.color = "#009900";
                        $("#resultWrp").append(forecast)
                    }
                })
            })
        }
    })
})
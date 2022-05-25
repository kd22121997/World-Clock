var continent = ""

function updateDateEverySecond() {
    setInterval(() => {
        document.getElementById('choose-continent').addEventListener("change", updateCountries())
        updateDate()
    }, 1000);
}

function updateDate() {
    let a = new Date();
    let country = document.getElementById('choose-country').value
    let time = new Date().toLocaleString("en-US", { timeZone: continent + "/" + country });
    document.getElementById("time").innerHTML = time
}

function setTimeZones() {
    let timeZones = []
    fetch("timezones.json").then(results => results.json())
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                timeZones.push(data[i])
            }
        })
    return timeZones;
}

function updateContinents() {
    let options = ""
    for (let i = 0; i < TimeZones.data.length; i++) {
        options = options + "<option id='continent-" + TimeZones.data[i].id + "' value='" + TimeZones.data[i].continent + "'>" + TimeZones.data[i].continent + "</option>"
    }
    document.getElementById('choose-continent').innerHTML = options
}

function getCountries(continent) {
    for (let i = 0; i < TimeZones.data.length; i++) {
        if (TimeZones.data[i].continent === continent) {
            return TimeZones.data[i].newRow;
        }
    }
}

function updateCountries() {
    if (continent == document.getElementById('choose-continent').value)
        return;
    continent = document.getElementById('choose-continent').value
    let countries = getCountries(continent)
    let options = ""
    countries.forEach(e => {
        options = options + "<option id='country-" + e.id + "' value='" + e.country + "'>" + e.country + "</option>"
    })
    document.getElementById('choose-country').innerHTML = options
}


document.addEventListener("DOMContentLoaded", function () {
    updateContinents()
    updateDateEverySecond()
})

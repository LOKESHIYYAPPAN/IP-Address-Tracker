const header = document.querySelector("header")
const ipdiv = document.getElementById("ip")
const loca = document.getElementById("location")
const timezone = document.getElementById("timezone")
const isp = document.getElementById("isp")

let map;


function setBg(){
    if(window.innerWidth <= 375){
        header.style.backgroundImage = "url(./images/pattern-bg-mobile.png)";
    }
    else{
        header.style.backgroundImage = "url(./images/pattern-bg-desktop.png)"
    }
}
setBg()

async function handleSearch(){
    const ip = document.getElementById("search").value
    const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_H4ERnHNwdsHcgfr5QF2BoXoGoIEOQ&ipAddress=${ip}`)
    const data  = await response.json()

    ipdiv.innerHTML = data.ip
    loca.innerHTML = `${data.location.country}, ${data.location.region}`
    timezone.innerHTML = data.location.timezone
    isp.innerHTML = data.isp

    handleCoordinates(ip)
}

function handleMap(lat, lon){
    if(!map){
        map = L.map('map').setView([lat, lon], 13);
    } else{
        map.setView([lat, lon], 13);
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([lat, lon]).addTo(map);
}

async function handleCoordinates(ip){
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()
    handleMap(data.lat, data.lon)
    console.log(data.lat, data.lon)
}

window.addEventListener("resize",setBg)
handleMap(34.0536, -118.084)
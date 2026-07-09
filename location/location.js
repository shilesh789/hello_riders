let lat =0;
let lon =0;


function getLocation(){
    
    
    const maps = document.getElementById("coordinate");

    navigator.geolocation.getCurrentPosition(function(position) {
     lat = position.coords.latitude;
     lon = position.coords.longitude;
    //  maps.innerText = lat + lon;
    var map = L.map('map').setView([lat, lon], 13);
    var marker = L.marker([lat,lon]).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map);
var marker2 = L.marker([lat,lon]).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}
)
}

function clearLocation(){
    const maps = document.getElementById("map")
    maps.remove();
}

function cameraOn(){
    const vid = document.getElementById("video");

    navigator.mediaDevices.getUserMedia({ video:true }).then((stream)=>{
        vid.srcObject=stream;
    }).catch((error)=>{
        console.log(error);
    })
}
function cameraOff(){
    const vid = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video:false }).then((stream)=>{
        vid.srcObject=null;
    }).catch((error)=>{
        console.log(error);
    })
    
    
    
}
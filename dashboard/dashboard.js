let map = null;

let userMarker = null;

let accuracyCircle = null;

let locationWatch = null;

let firstLocation = true;

let latitude = 0;

let longitude = 0;


let trackingCoordinates = [];

let trackingLine = null;


const riders = [

    {
        name: "Ram",
        position: [28.2210, 83.9700],
        speed: "49 km/h",
        status: "online"
    },

    {
        name: "Hari",
        position: [28.2100, 83.9970],
        speed: "0 km/h",
        status: "stopped"
    },

    {
        name: "Sita",
        position: [28.1870, 83.9650],
        speed: "46 km/h",
        status: "online"
    }

];


function createMap() {


    // Create Leaflet map

    map = L.map("map");
    // Initial map position
    map.setView(
        [28.2096, 83.9856],
        13

    );


    L.tileLayer(

        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

        {
            maxZoom: 19,

            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

        }

    ).addTo(map);
    trackingLine = L.polyline(

        trackingCoordinates,
        {

            color: "#0868ed",

            weight: 4,

            opacity: 0.95,

            lineJoin: "round",

            lineCap: "round"

        }

    ).addTo(map);


    riders.forEach(function(rider) {
        createMemberMarker(

            rider.position,

            rider.name,

            rider.speed,

            rider.status

        );

    });

    setTimeout(function() {
        map.invalidateSize();

    }, 500);

}

function createMemberMarker(

    position,

    name,

    speed,

    status

) {


    let statusClass = "";

    let speedColor = "#159353";


    if (status === "stopped") {

        statusClass = "stopped";

        speedColor = "#ed7d18";

    }

    const label = `

        <div class="map-member-label ${statusClass}">

            <strong>
                ${name}
            </strong>

            <span style="color:${speedColor}">
                ${speed}
            </span>

        </div>

    `;



    const icon = L.divIcon({

        className: "",

        html: label,

        iconSize: null,

        iconAnchor: [0, 20]

    });



    const marker = L.marker(

        position,

        {

            icon: icon

        }

    ).addTo(map);


    marker.bindPopup(`

        <div class="popup-content">

            <strong>
                ${name}
            </strong>

            <span>
                Speed: ${speed}
            </span>

            <span class="popup-online">

                ${
                    status === "stopped"
                    ? "Stopped"
                    : "Online"
                }

            </span>

        </div>

    `);

}

function startLocationTracking() {


    // Check browser support

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported by your browser."
        );

        return;

    }

    locationWatch = navigator.geolocation.watchPosition(

        function(position) {


            // Get latitude

            latitude =
                position.coords.latitude;


            // Get longitude

            longitude =
                position.coords.longitude;


            // Get GPS accuracy

            const accuracy =
                position.coords.accuracy;



            console.log(
                "Latitude:",
                latitude
            );


            console.log(
                "Longitude:",
                longitude
            );


            console.log(
                "Accuracy:",
                accuracy
            );



            // Update marker

            updateUserLocation(

                latitude,

                longitude,

                accuracy

            );


            addTrackingPoint(

                latitude,

                longitude

            );

            showCoordinates();

            setUserActive();

        },

        function(error) {


            console.log(
                "Location Error:",
                error.message
            );

            if (error.code === 1) {

                alert(
                    "Location permission was denied. Please allow location access."
                );

            }

            else if (error.code === 2) {

                console.log(
                    "Location unavailable."
                );

            }

            else if (error.code === 3) {

                console.log(
                    "Location request timed out."
                );

            }

        },


        {

            enableHighAccuracy: true,

            maximumAge: 0,

            timeout: 10000

        }

    );

}

function updateUserLocation(

    lat,

    lon,

    accuracy

) {


    const position = [

        lat,

        lon

    ];

    if (userMarker === null) {


        userMarker = L.marker(

            position

        ).addTo(map);

        userMarker.bindPopup(`

            <div class="popup-content">

                <strong>
                    You
                </strong>

                <span>
                    Current Location
                </span>

                <span class="popup-online">
                    Online
                </span>

            </div>

        `);


    }

    else {


        // Move existing marker

        userMarker.setLatLng(

            position

        );

    }

    if (accuracyCircle === null) {


        accuracyCircle = L.circle(

            position,

            {

                radius: accuracy,

                color: "#1478e8",

                fillColor: "#1478e8",

                fillOpacity: 0.10,

                weight: 1

            }

        ).addTo(map);


    }

    else {


        accuracyCircle.setLatLng(

            position

        );


        accuracyCircle.setRadius(

            accuracy

        );
    }

    if (firstLocation) {


        map.setView(

            position,

            15

        );


        firstLocation = false;

    }

}

function addTrackingPoint(

    lat,

    lon

) {


    const newPoint = [

        lat,

        lon

    ];



    // Add point to array

    trackingCoordinates.push(

        newPoint

    );



    // Update blue line

    if (trackingLine !== null) {


        trackingLine.setLatLngs(

            trackingCoordinates

        );

    }



    console.log(

        "Tracking points:",

        trackingCoordinates

    );

}

function showCoordinates() {


    const coordinateBox =

        document.getElementById(
            "coordinate"
        );


    if (!coordinateBox) {

        return;

    }



    coordinateBox.innerText =

        "Lat: " +

        latitude.toFixed(6) +

        " | Lon: " +

        longitude.toFixed(6);

}

function setUserActive() {


    const status =

        document.getElementById(
            "userStatus"
        );


    const onlineStatus =

        document.getElementById(
            "userOnlineStatus"
        );


    if (status) {


        status.innerHTML = `

            <span class="active-dot"></span>

            Active

        `;

    }


    if (onlineStatus) {

        onlineStatus.innerText =
            "Online";

    }

}

function pauseRide() {


    alert(
        "Ride paused."
    );

}

function endRide() {


    const answer = confirm(

        "Are you sure you want to end the ride?"

    );


    if (answer) {


        // Stop GPS tracking

        if (locationWatch !== null) {

            navigator.geolocation.clearWatch(

                locationWatch

            );

            locationWatch = null;

        }


        alert(
            "Ride ended."
        );

    }

}

function shareLocation() {


    // Check location

    if (

        latitude === 0 ||

        longitude === 0

    ) {


        alert(
            "Your current location is not available yet."
        );


        return;

    }

    const locationLink =

        "https://www.google.com/maps?q=" +

        latitude +

        "," +

        longitude;

    if (navigator.share) {


        navigator.share({

            title:
                "RideConnect Location",

            text:
                "Here is my current RideConnect location.",

            url:
                locationLink

        });


    }

    else {


        // Copy link

        navigator.clipboard.writeText(

            locationLink

        );


        alert(
            "Location link copied."
        );

    }

}

function sosEmergency() {
    const answer = confirm(

        "Do you want to send an SOS emergency alert?"

    );
    if (answer) {


        alert(
            "SOS emergency alert sent."
        );

    }

}

document.addEventListener(

    "DOMContentLoaded",

    function() {

        createMap();

        startLocationTracking();
        setUserActive();

    }
);
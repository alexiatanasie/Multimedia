window.onload = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        var map = L.map('map').setView([lat, long], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var marker = L.marker([lat, long]).addTo(map);
        var circle = L.circle([lat, long], {
            radius: position.coords.accuracy
        }).addTo(map);

        //let polyline = L.polyline([[lat, long], [0, 0]]).addTo(map);


        setInterval(() => {
            marker.remove();
            circle.remove();
            long += 10;
            
            let marker = L.marker([lat, long]).addTo(map);
            let circle = L.circle([lat, long], {
                radius: position.coords.accuracy
            }).addTo(map)

        }, 500);
    })

}
mapboxgl.accessToken = token_mapbox;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [108.22760806240348, 16.06130596951281], // Thay đổi longitude và latitude tùy theo vị trí mong muốn
  zoom: 13, // Thay đổi mức zoom tùy theo mong muốn
});
fetch("data.json")
  .then((res) => res.json())
  .then((json) => {
    var markers = json.data.markers;

    markers.forEach(function (markerData) {
      var typeMark = "marker-1";
      if (markerData.type == 2) {
        typeMark = "marker-2";
      } else if (markerData.type == 3) {
        typeMark = "marker-3";
      } else if (markerData.type == 4) {
        typeMark = "marker-4";
      } else if (markerData.type == 5) {
        typeMark = "marker-5";
      }

      var customIcon = document.createElement("div");
      customIcon.className = `mapboxgl-marker ${typeMark}`;
      var marker = new mapboxgl.Marker({ element: customIcon })
        .setLngLat([markerData.lon, markerData.lat])
        .addTo(map);
      console.log(markerData);
      var html = `
            <h3 class="popupTtl">Zoro-${markerData.type} ${markerData.name}</h3>
            <p class="popupDesc">${markerData.desc}</p>
            <img class="popupImg" src="../imgs/${markerData.img}.png"/>
            <p class="popupInfo">${markerData.info}</p>
            `;

      var popup = new mapboxgl.Popup().setHTML(html);

      marker.setPopup(popup);

      marker.on("click", function () {
        marker.togglePopup();
      });
    });
  });

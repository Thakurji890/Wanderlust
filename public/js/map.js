 mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length) ? listing.geometry.coordinates : [77.2090, 28.6139], 
  zoom: 9, 
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat((listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length) ? listing.geometry.coordinates : [77.2090, 28.6139])
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4>
      <p>Exact Location will be provided after booking</p>`
    )
  )
  .addTo(map); 
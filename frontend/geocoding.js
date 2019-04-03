let map;
let geocoder;
let latlng;
let initLocation = {lat:37.570204, lng: 126.976956}; // 서울 중심 좌표: 37.570204 , 126.976956
function initializeMap() {
  map = new naver.maps.Map(document.getElementById('map'),{
                center: initLocation,
                zoom: 10,
                scaleControl: true
            });
  geocoder = new naver.maps.Service.geocode();
  setupEvents();
  centerChanged();
}
function setupEvents() {
  centerChangedLast = new Date();
  naver.maps.Event.addListener(map, 'center_changed', centerChanged);
  naver.maps.Event.addDomListener(document.getElementById('crosshair'),'dblclick', function() {
     map.setZoom(map.getZoom() + 1);
  });
}
function getCenterLatLngText() {
  return '(' + map.getCenter().lat() +', '+ map.getCenter().lng() +')';
}
function centerChanged() {
  centerChangedLast = new Date();
  latlng = getCenterLatLngText();
  document.getElementById('latlng').innerHTML = latlng;
  currentReverseGeocodeResponse = null;
}
function geocode() {
  let address = document.getElementById("address").value;
  geocoder.geocode({
    'address': address,
    'partialmatch': true}, geocodeResult);
}
function geocodeResult(results, status) {
  if (status == 'OK' && results.length > 0) {
    map.fitBounds(results[0].geometry.viewport);
  } else {
    alert("Geocode was not successful for the following reason: " + status);
  }
}

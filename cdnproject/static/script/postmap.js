navigator.geolocation.getCurrentPosition(function succes_func(position) {
  //取得したデータを整理
  var data = position.coords;
  //lat:緯度　lng:経度
  var lat = data.latitude;
  var lng = data.longitude;
  var mpoint = [lat, lng];
  var osm = L.tileLayer('/static/osm/{z}/{x}/{y}.png');

  var map = L.map('mapcontainer', {
    layers: [osm],
    center: [lat, lng],
    zoom: 16,
    zoomControl: false
  });
});

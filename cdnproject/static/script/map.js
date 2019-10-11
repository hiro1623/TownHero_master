function main() {
    test = 10;
    navigator.geolocation.getCurrentPosition(function succes_func(position) {

            var posts = [
                ["20190807", "testUser01", 1, 34.236312, 132.601736, "これは投稿表示テスト用1の文章です．藤三"],
                ["20190808", "testUser02", 1, 34.228246, 132.602541, "これは投稿表示テスト用2の文章です．阿賀端"],
                ["20190809", "testUser03", 2, 34.232259, 132.600007, "これは投稿表示テスト用3の文章です．高専陸上"],
                ["20190810", "testUser04", 1, 34.231081, 132.602176, "これは投稿表示テスト用4の文章です．活動拠点"],
                ["20190815", "testUser04", 1, 34.234539, 132.598192, "これは投稿表示テスト用4の文章です．大体三和ストア"],
                ["20190815", "testUser04", 1, 34.229539, 132.608192, "これは投稿表示テスト用4の文章です．少年野球の場所"]
            ];
            // [TEST-01]

            //取得したデータを整理
            var data = position.coords;
            //lat:緯度　lng:経度
            var lat = data.latitude;
            var lng = data.longitude;
            var mpoint = [lat, lng];
            // 地図表示
            var osm = L.tileLayer('https://tile.openstreetmap.jp/{z}/{x}/{y}.png', { attribution: "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> " });
            // var osm = L.tileLayer('/static/osm/{z}/{x}/{y}.png');

            var map = L.map('mapcontainer', {
                layers: [osm],
                center: [lat, lng],
                zoom: 15,
                zoomControl: false
            });


            // マーカー表示
            var pulsingIcon = L.icon.pulse({
                iconColor: '#87cefa',
                iconSize: [20, 20],
                color: '#87cefa'
            });
            var circle = L.circle(mpoint, {
                className: "clCircle",
                radius: 500,
                weight: 5,
                color: "rgba(248, 181, 0, 1.0)",
                fillColor: "aqua",
                fillOpacity: 0.1
            }).addTo(map);


            L.marker(mpoint, { icon: pulsingIcon }).addTo(map);

            //L.simpleMapScreenshoter().addTo(map)


            // [TEST-01] 投稿表示機能 [日時, userID, 属性, 緯度, 経度, 投稿内容]
            for (var i = 0; i < posts.length; i++) {
                if (0.50 >= distance(lat, lng, posts[i][3], posts[i][4])) {
                    L.marker([posts[i][3], posts[i][4]], { icon: L.divIcon({ className: 'activeMarker' }) }).bindPopup(posts[i][0] + "<br>" + posts[i][5]).addTo(map);

                } else {
                    L.marker([posts[i][3], posts[i][4]], { icon: L.divIcon({ className: 'deactiveMarker' }) }).addTo(map);
                }
            } // [TEST-01]


            // 内部関数
            // 関数： 2点間の距離を算出
            function distance(lat1, lng1, lat2, lng2) {
                lat1 *= Math.PI / 180;
                lng1 *= Math.PI / 180;
                lat2 *= Math.PI / 180;
                lng2 *= Math.PI / 180;
                return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
            }
            // error messege
        },
        function(error) {
            switch (error.code) {
                case 1: //PERMISSION_DENIED
                    alert("位置情報の利用が許可されていません");
                    break;
                case 2: //POSITION_UNAVAILABLE
                    alert("現在位置が取得できませんでした");
                    break;
                case 3: //TIMEOUT
                    alert("タイムアウトになりました");
                    break;
                default:
                    alert("その他のエラー(エラーコード:" + error.code + ")");
                    break;
            }
        });

}
// ultra unchi
// super unchi
// hyper unchi

  function init() {
    navigator.geolocation.getCurrentPosition(function succes_func(position) {

      // [TEST-01] 投稿表示テスト用配列 [日時, userID, 緯度, 経度, 投稿内容]
      //           とりあえず投稿内容なども表示しているが，アクセス制限の観点からこの時点ではまだ受け取るべきじゃない感
      var posts = [
        ["20190807", "testUser01", 34.236312, 132.601736, "これは投稿表示テスト用1の文章です．藤三"],
        ["20190808", "testUser02", 34.228246, 132.602541, "これは投稿表示テスト用2の文章です．阿賀端"],
        ["20190809", "testUser03", 34.232259, 132.600007, "これは投稿表示テスト用3の文章です．高専陸上"]
      ];
      // [TEST-01]

      //取得したデータを整理
      var data = position.coords;
      //lat:緯度　lng:経度
      var lat = data.latitude;
      var lng = data.longitude;
      var map = L.map('mapcontainer', {zoomControl: false});
      var mpoint = [lat, lng]
      map.setView(mpoint, 16);
      
      
      // マーカー表示
      var pulsingIcon = L.icon.pulse({
        iconColor: '#87cefa',
        iconSize: [20,20],
        color: '#87cefa'
      });
      var circle = L.circle(mpoint,{
        className: "clCircle",
        radius: 250,
        weight: 5,
        color: "rgba(248, 181, 0, 1.0)",
        fillColor: "aqua",
        fillOpacity: 0.1
      }).addTo(map);
      L.marker(mpoint,{icon: pulsingIcon}).addTo(map);
      //L.control.scale({maxWidth: 200, position: 'bottomright', imperial: false}).addTo(map);
      //L.control.zoom({position: 'bottomleft'}).addTo(map);
      
      
      // 地図表示
      //地理院地図の標準地図タイル
      var gsi = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'></a>"});
      //地理院地図の淡色地図タイル
      var gsipale = L.tileLayer('http://cyberjapandata.gsi.go.jp/xtyz/pale/{z}/{x}/{y}.png', {attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'></a>"});
      //オープンストリートマップのタイル
      var osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {attribution: "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> "});
      //baseMapsオブジェクトのプロパティに3つのタイルを設定
      var baseMaps = {
        "地理院地図": gsi,
        "淡色地図": gsipale,
        "オープンストリートマップ": osm,
      };
      // layersコントロールにbaseMapsオブジェクトを設定して地図に追加
      // コントロール内にプロパティ名が表示される
      /* L.control.layers(baseMaps).addTo(map); */
      osm.addTo(map);

      // [TEST-01] 投稿表示機能 [日時, userID, 緯度, 経度, 投稿内容]
      for (var i=0; i<posts.length; i++){
        L.marker([posts[i][2], posts[i][3]],{icon: L.divIcon}).bindPopup(posts[i][0] + "\n" + posts[i][4]).addTo(map);
      }
      // [TEST-01]
      
      // 地図のclickイベントでonMapClick関数を呼び出し
      map.on('click', onMapClick);

      // MapClickイベント(マーカーの作成と削除)
      function onMapClick(e) {
        //地図のclickイベント呼び出される クリック地点の座標にマーカーを追加、マーカーのclickイベントでonMarkerClick関数を呼び出し
        var mk = L.marker(e.latlng).on('click', onMarkerClick).addTo(map);
      }
      function onMarkerClick(e) {
        //マーカーのclickイベント呼び出される クリックされたマーカーを地図のレイヤから削除する
        map.removeLayer(e.target);
      }
      
    
    // error messege
    }, function (error) {
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
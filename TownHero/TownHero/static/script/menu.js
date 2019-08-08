$(function(){
  // 変数宣言
  // 現在のメニュー以外全て display: none にする為の変数
  // https://qiita.com/Sekky0905/items/598b47fea2106b8c140e
  var hashNames = ["#map", "#post", "#history",
                   "settinng", "help", "search"];
  
  // 初期表示設定
  if (location.hash === ""){
    location.hash = "#map";
  }
  displayPage(location.hash);

  // ボタン押下のページ遷移処理
  $(".menu_btn").click(function(e){
    e.preventDefault();
    var hash = "#"+$(this).attr("data-hash");
    location.hash = hash;
  })

  // ハッシュ変更時のページ遷移処理
  $(window).hashchange(function(){
    clearPage();
    displayPage(location.hash);
  })

  
  // 表示用
  function clearPage(){
    $(".app_body").css({
      "display": "none",
    });
  }
  function displayPage(hash){
    // ボタンのを初期状態に戻す
    $(".menu_btn").css({
      "background-color": "rgba(255, 255, 255, 0.0)",
      "color": "rgba(150, 150, 150, 1.0)"
    });
    
    // #map のStyleSheet
    if(hash === "#map"){
      $(hash).css({
        "display": "none"
      });
      $("button[data-hash='map']").css({
        "background-color": "rgba(150, 150, 150, 1.0)",
        "color": "#ffffff"
      });
    
    // #post のStyleSheet
    } else if(hash === "#post"){
      $(hash).css({
        "display": "block",
        "width": "80%",
        "height": "60%",
        "top": "0",
        "bottom": "0",
        "right": "0",
        "left": "0",
        "border-radius": "10px",
        "margin": "auto",
        "position": "absolute",
        "color": "rgba(0,138,255,1.0)",
        "text-align": "left",
        "padding": "3px",
        "background-color": "rgba(255, 255, 255, 0.8)",
        "font-size": "10px"
      });
      $(hash + ">.area1").css({
        "text-align": "left",
        "position": "relative",
        "padding": "0px 0px 0px 0px",
        "width": "100%",
        "height": "10%",
        "border-bottom": "solid",
        "border-bottom-color": "rgba(0, 0, 0, 0.2)",
        "border-width": "1px"
      });
      $("button.post_reset").css({
        "display": "inline-block",
        "position": "abusolute",
        "padding": "1px",
        "margin": "auto auto auto 7px",
        "height": "90%",
        "z-index": "100",
        "font-size": "18px",
        "letter-spacing": "0px",
        "color": "rgba(0,138,255,1.0)"
      });
      $("button.post_reset:active").css({
        "color": "rgba(0,108,200,1.0)"
      });
      $("button.post_send").css({
        "display": "inline-block",
        "position": "absolute",
        "right": "7px",
        "padding": "1px",
        "margin": "auto auto auto auto",
        "height": "90%",
        "z-index": "100",
        "font-size": "18px",
        "letter-spacing": "0px",
        "color": "rgba(0,138,255,1.0)"
      });
      
      $(hash + ">.area2").css({
        "position": "relative",
        "padding": "0px",
        "width": "100%",
        "height": "10%",
        "border-bottom": "solid",
        "border-bottom-color": "rgba(0, 0, 0, 0.2)",
        "border-width": "1px"
      });
      $(hash + ">.area2>p").css({
        "position": "absolute",
        "margin": "auto auto auto 0"
      });
      
      $(hash + ">.area3").css({
        "position": "relative",
        "width": "100%",
        "height": "30%",
        "border-bottom": "solid",
        "border-bottom-color": "rgba(0, 0, 0, 0.2)",
        "border-width": "1px"
      });
      $(hash + ">.area4").css({
        "position": "relative",
        "width": "100%",
        "height": "10%",
        "border-bottom": "solid",
        "border-bottom-color": "rgba(0, 0, 0, 0.2)",
        "border-width": "1px"
      });
      $(hash + ">.area5").css({
        "position": "relative",
        "width": "100%",
        "height": "40%",
      });
      $("button[data-hash='post']").css({
        "background-color": "rgba(150, 150, 150, 1.0)",
        "color": "#ffffff"
      });
    }
    
    // #history のStyleSheet
    else if(hash === "#history"){
      $(hash).css({
        "display": "block",
        "width": "70%",
        "height": "50%",
        "top": "0",
        "bottom": "0",
        "right": "0",
        "left": "0",
        "border-radius": "10px",
        "margin": "auto",
        "position": "absolute",
        "color": "rgba(255,0,255,1.0)",
        "text-align": "center",
        "background-color": "rgba(255, 255, 255, 0.8)",
        "font-size": "10px"
      })
      $("button[data-hash='history']").css({
        "background-color": "rgba(150, 150, 150, 1.0)",
        "color": "#ffffff"
      });
      
    // #search のStyleSheet
    } else if(hash === "#search"){
      $(hash).css({
        "display": "none"
      });
      $("button[data-hash='search']").css({
        "background-color": "rgba(150, 150, 150, 1.0)",
        "color": "#ffffff"
      });
    
    // #setting のStyleSheet
    } else if(hash === "#setting"){
      $(hash).css({
        "display": "none"
      });
      $("button[data-hash='setting']").css({
        "color": "#ffffff"
      });

    // #help のStyleSheet
    } else if(hash === "#help"){
      $(hash).css({
        "display": "none"
      });
      $("button[data-hash='help']").css({
        "background-color": "rgba(150, 150, 150, 1.0)",
        "color": "#ffffff"
      });

    // ハッシュタグが例外時は表示を消す
    } else {
      $(".app_body").css("display", "none");
    };
  }
});
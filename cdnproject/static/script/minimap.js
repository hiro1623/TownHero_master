/* show screen btn in panel */
var mapSimple = L.map('mapSimple').setView([40, -74], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapSimple);
L.simpleMapScreenshoter({
        screenName: function() {
            return new Date().toDateString()
        }
    }).addTo(mapSimple)
    // add loaders
mapSimple.on('simpleMapScreenshoter.takeScreen', function() {
    document.getElementById('mapsScreeningState').innerHTML += 'screening...<br>'
})
mapSimple.on('simpleMapScreenshoter.done', function() {
    document.getElementById('mapsScreeningState').innerHTML += 'screen end...<br>'
})
mapSimple.on('simpleMapScreenshoter.error', function(event) {
        console.error(event.e)
        document.getElementById('mapsScreeningState').innerHTML += event.e.toString() + '<br>'
    })
    /* custom usage */
var minimap = L.map('minimap').setView([56, 37], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(minimap);
var simpleMapScreenshoter = L.simpleMapScreenshoter({
        hidden: true
    }).addTo(minimap)
    // return as blob
document.getElementById('screenMap').addEventListener('click', function() {
        simpleMapScreenshoter.takeScreen('blob', {
            caption: function() {
                return 'Hello world'
            }
        }).then(blob => {
            var a = document.createElement('a')
            var url = window.URL.createObjectURL(blob)
            document.body.appendChild(a)
            a.href = url
            a.download = 'screen.png'
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch(e => {
            alert(e.toString())
        })
    })
    // return as image
document.getElementById('screenMapAndPast').addEventListener('click', function() {
        simpleMapScreenshoter.takeScreen('image', {
            caption: function() {
                return 'Hello world'
            }
        }).then(image => {
            var img = document.createElement('img')
            img.src = image
            document.getElementById('screens').appendChild(img)
        }).catch(e => {
            alert(e.toString())
        })
    })
    // listen on fired error or catch error in prev promise
map.on('simpleMapScreenshoter.error', function(event) {
    var el = document.createElement('div')
    el.classList.add('create-screen-error')
    el.innerHTML = event.e.toString()
    document.getElementById('screens').appendChild(el)
})
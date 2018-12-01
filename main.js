
// var map = new L.Map('map-canvas', {
    //     center: new L.LatLng(25.6586, -80.3568),
    //     zoom: 4,
    
    //   });
  
    // testData = {
    //     max: 8,
    //     data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1}]
    // };
    
    function elToPoint({Дължина,Ширина}){
        return {lng:Дължина,lat:Ширина,count:1}
    } 
    

    
    
    
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": .005,
        "blur" : .1,
        "maxOpacity": .6, 
        "gradient":{"0":"red","1":"lightgreen"},
        // scales the radius based on map zoom
        "scaleRadius": true, 
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    };
    
    
var heatmapLayer = new HeatmapOverlay(cfg);
    
    

//L.CRS.Earth
var map = L.map('mapid',{crs: L.CRS.EPSG3857,layers: [heatmapLayer]}).setView([42.66044444444444, 23.39877777777778], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let pin = L.icon({
    iconUrl: 'leaf-green.png'});

    fetch("output.json")
    .then(e=>e.json())
    .then(json=>{
        var [array] = json; 
        array = array.records.map(elToPoint);
        console.log(array);
        var data = {
            max:20,
            data : array
        };

        console.log(data)
        heatmapLayer.setData(data);
        
        for (var a=0;a<array.length;a++){
            let e = array[a];
            if (!e.lng || !e.lat){
                console.log("error",e);
                continue;
            }
            L.marker([e.lat,e.lng],{icon:pin}).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        }
    
    });
        

    

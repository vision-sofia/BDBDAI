


let array,sports,markers;



// let map = new L.Map('map-canvas', {
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
    
    function addSport(str){
        let parent = document.getElementById("sport");
        let newoption = document.createElement("option")
        newoption.value = str;
        parent.appendChild(newoption);
    }

    function updatepage(array,filter){

        // L.circle([42.696739, 23.319754], {radius: 15000,color:"red",opacity:}).addTo(map);

        //////

        let truedata = array.filter(filter);
        console.log(truedata.length);
        let worked = truedata.map(elToPoint);
        // console.log(truedata,worked);
        let data = {
            max:20,
            data : worked
        };
        heatmapLayer.setData(data);
        



        /////////////////////////
        
        markers.clearLayers();        
        for (let a=0;a<truedata.length;a++){
            let e = truedata[a];
            // console.log(e);
            if (!e.Ширина || !e.Дължина){
                continue;
            }
            let mark = L.marker([e.Ширина,e.Дължина],{icon:pin}).bindPopup(`<a href="${e.Линк}">${e.Име}</а>`,{className:"popup"})
            .openPopup();
            mark.addTo(map);
            mark.addTo(markers);
            
        }

    
    }

    
    
    
    let cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "backgroundColor": "rgba(255,0,0,0.0)", 
        "radius": .015,
        "blur" : 1,
        "maxOpacity": .4, 
        "gradient":{"0":"darkred","0.95":"yellow","1":"lightgreen"},
        // "gradient":{"0":"darkred","0.95":"lightgreen","1":"yellow"},
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
    
    
let heatmapLayer = new HeatmapOverlay(cfg);
    
    

//L.CRS.Earth
let map = L.map('mapid',{crs: L.CRS.EPSG3857,layers: [heatmapLayer]}).setView([42.696739, 23.319754], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let pin = L.icon({
    iconUrl: 'pin2.png',
    iconSize: [30,30] 
});


    fetch("output.json")
    .then(e=>e.json())
    .then(json=>{

        array = json[0].records;
        console.log(json[0].records); 
        //42.780596, 23.186962
        //42.577532, 23.492909
        //e.lat >42.780596 && e.lng > 23.186962 && e.lat<42.577532 && e.lng <23.492909)
        array = array.filter(e=>e.Град=="София");

        sports = [];
        console.log(array[0]);
        for (var t in array[0]){
            if (
                t == "Дължина" ||
                t == "Ширина" ||
                t == "Град" ||
                t == "Координати" ||
                t == "Линк" ||
                t == "id" ||
                t == "Kвартал" ||
                t == "Адрес" ||
                t == "Име" ||
                t == "Ново" ||
                t == "За деца" ||
                t == "Лого" )
                continue;
            sports.push(t);
            // sports.forEach(e=>addSport(e));
        }

        let y = $( "#tags" ).autocomplete({
            source: sports
          });
          console.log(y);
        
        markers = new L.LayerGroup().addTo(map);
        
        updatepage(array,e=>true);
        
    });
        

    
var tags = document.getElementById("tags");
tags.onchange = e=>{
    if (sports.includes(tags.value)){
        updatepage(array,e=>e[tags.value]!=null);
    }
}


        
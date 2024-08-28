$(()=>{
    var map = L.map('map').setView([32.8482366, 35.0625378], 15);
        
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0&q=`

    $("#submit").on("click", () => {
        let userSearch = $("#cityName").val();
        $.get(url+userSearch, (response) => {
        //console.log(response.result.records);
            let myData = response.result.records;
            for (let index = 0; index < myData.length; index++) {
                if(myData[index].CityName === userSearch){
                    let marker = L.marker([myData[index].Lat,myData[index].Long]).addTo(map);
                }
            };
        });
    });
});
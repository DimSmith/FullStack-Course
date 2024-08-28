$(() => {
    //API for all countries statics
    const allCountriesUrl = "https://restcountries.com/v3.1/all"
    //API for specific country statics
    const searchCountyUrl = "https://restcountries.com/v3.1/name/"
    
    //Getting data for all countries 
    $("#countriesStatistics").on("click", () => {
        $.get(allCountriesUrl, (data) => showStatistics(data),
        "json");
    });

    //Getting data for specific country
    $("#specificStatistics").on("click", () => {
        //Getting the specific country from the search field
        let userSearch = $("#searchName").val();
        if(userSearch===null){
            return;
        }else{
            $.get(searchCountyUrl+userSearch, (data) => showStatistics(data),
            "json");
        }
    });
});

const showStatistics=(data)=>{
    //Building the tables
    $("#countriesPopulation").append(`
                    <tr>
                        <th>Country Name</th>
                        <th>Number Of Citizens</th>
                    </tr>
    `)
    $("#regionsCountries").append(`
                    <tr>
                        <th>Region</th>
                        <th>Number Of Countries</th>
                    </tr>
    `)

    let totalPopulation = 0;
    let regionStatistics = new Object();
    let regionNumberOfCountries = 1;

    for (let index=0; index<data.length; index++){
        //Counting all the population
        totalPopulation += data[index].population;

        $("#countriesPopulation").append(`
                    <tr>
                        <td>${data[index].name.common}</td>
                        <td>${data[index].population}</td>
                    </tr>
        `)
        
        //Fill the object with region counting
        if (regionStatistics[data[index].region] == undefined) {
            regionStatistics[data[index].region] = regionNumberOfCountries;
        } else {
            regionStatistics[data[index].region] += regionNumberOfCountries;
        }
    }
    displayRegionStatistics(regionStatistics);

    //Calculate the average population for country
    let averagePopulation = Math.round(totalPopulation / data.length);

    //Show the Statistics
    $("#statistics").html(`
        Total Countries Result:${data.length}<br/>
        Total Countries Population:${totalPopulation}<br/>
        Average Population:${averagePopulation}<br/>
    `)
}

const displayRegionStatistics = (data) => {
    for(item in data) {
        $("#regionsCountries").append(`
            <tr>
                <td>${item}</td>
                <td>${data[item]}</td>
            </tr>`);
    }
}

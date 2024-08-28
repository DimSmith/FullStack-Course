$(() => {
    //API call for the coins/callback from local storage and building the main page
    const myURL ="https://api.coingecko.com/api/v3/coins/list";
    let coins = JSON.parse(localStorage.getItem("myCoins"));
    if (coins === null){
        let coins = [];
        $.get(myURL,(data) =>{
            coins=data;
            saveCoins(data);
            builtCoinsTab(data);
        })
    }
    else{
        builtCoinsTab(coins);
    }

    //Initialize "Search" Button
    $("#searchButton").on("click", () => {
        let userSearch = $("#coinSearch").val();
        if(userSearch===""){
            return;
        }else{
            $(".row").empty();
            for(let index=0; index<coins.length; index++){
                if(userSearch === coins[index].symbol){
                    $(".row").append(`
                    <div class="card col-sm-3" >
                        <div class="card-body d-flex flex-column">
                            <!--Toggle button-->
                            <div class="form-check form-switch ms-auto">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                            </div>
                            <!--Coin Symbol-->
                            <h5 class="card-title me-auto" id="cardTitle">${coins[index].symbol.toUpperCase()}</h5>
                            <!--Coin ID-->
                            <p class="card-text me-auto" id="cardName">${coins[index].id}</p>
                            <!--Button to Open the Modal-->
                            <button type="button" class="modalButton btn btn-primary me-auto" data-toggle="modal" data-target="#infoModal">
                                More Info
                            </button>
                            <!-- The Modal -->
                            <div class="modal" id="infoModal${index}">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <!-- Modal Header -->
                                        <div class="modal-header"></div>
                                        <!-- Modal body -->
                                        <div class="modal-body"></div>
                                        <!-- Modal footer -->
                                        <div class="modal-footer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)   
                }
            }
        }
    });

    //Initialize "Home" Button
    $("#navaHome").on("click", () => {
        $(".row").empty();
        $(".form-check-input").prop('checked', false);
        checkedCoins = [];
        checkedCount = 0;
        $("#chartContainer").empty();
        builtCoinsTab(coins);
    });

    //Initialize "More Info"  Button
    $('body').on('click', '.modalButton', function () {
        const coinId = $(this).siblings(".card-text").text();
        const modalId = $(this).closest('.card').find('.modal').attr('id');
        fetchCoinData(coinId, modalId);
    });
    
    //Initialize "About"  Button
    $("#navaAbout").on("click", () => {
        aboutTab();
    });

    const maxChecked = 5;
    let checkedCount = 0;
    let checkedCoins = [];

    //Add & Updating Checked Toggles
    const updateCheckedCount = (coinId, checked) => {
        if (checked) {
            checkedCount++;
            if (checkedCoins.length<5){
                checkedCoins.push(coinId);
            }else{
                return;
            }     
        } else {
            checkedCount--;
            const index = checkedCoins.indexOf(coinId);
            if (index !== -1) {
                checkedCoins.splice(index, 1);
            }
        }
    };

    //Initializing The Toggle Limit Modal Window 
    $('body').on('change', '.form-check-input', function () {
        const coinId = $(this).closest('.card-body').find('.card-title').text().trim();
        const checked = $(this).prop('checked');
        updateCheckedCount(coinId, checked);
    
        if (checkedCount > maxChecked) {
            $(this).prop('checked', false);
            updateCheckedCount(coinId, false);
            $('#modalExceedLimit .modal-body').empty();
            checkedCoins.forEach((coin) => {
                $('#modalExceedLimit .modal-body').append(`
                    <div class="toggledCoin">
                        <div class="coinToggleId">${coin}</div>
                        <div class="form-check form-switch ms-auto">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
                        </div>
                    </div>
                `);
            });
            $('#modalExceedLimit').modal('show');
    
            $('#modalExceedLimit .modal-body').off('change').on('change', 'input', function () {
                const chosenCoinId = $(this).closest('.toggledCoin').find('.coinToggleId').text();
                const chosenToggle = $(`.card-title:contains('${chosenCoinId}')`).siblings('.form-check').find('.form-check-input');
                const chosenIndex = checkedCoins.indexOf(chosenCoinId);
                if (chosenIndex !== -1) {
                    checkedCoins.splice(chosenIndex, 1);
                    chosenToggle.prop('checked', false);
                }
    
                const newCoinId = coinId;
                const newToggle = $(`.card-title:contains('${newCoinId}')`).siblings('.form-check').find('.form-check-input');
                checkedCoins.push(newCoinId);
                newToggle.prop('checked', true);
    
                $('#modalExceedLimit').modal('hide');
                updateCheckedCount(newCoinId, true);
            });
    
            $('#modalExceedLimit').off('click').on('click', '.notChange', function () {
                $(this).prop('checked', false);
                updateCheckedCount(coinId, false);
                $('#modalExceedLimit').modal('hide');
            });
        }
    });

    //Initializing "Live Reports" button
    $("#navaReports").on("click", () => {
        updateLiveReports(checkedCoins);
        setInterval(() => {
            updateLiveReports(checkedCoins);
        },2000);
    });
});

// Function to fetch live data for checked coins and update the chart
const updateLiveReports = (checkedCoins) => {
    const coinPriceURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${checkedCoins.join(',')}&tsyms=USD`;

    $.get(coinPriceURL, (data) => {
        const timeNow = new Date(); // Get current time

        //Add new data points or update existing data points or 
        Object.keys(data).forEach((coin) => {
            const coinValue = data[coin].USD;

            // Find the existing data series for this coin or create a new one
            let existingSeries = options.data.find((series) => series.name === coin);
            if (!existingSeries) {
                existingSeries = {
                    type: "line",
                    showInLegend: true,
                    name: coin,
                    dataPoints: []
                };
                options.data.push(existingSeries);
            }

            // Add the new data point to the existing series
            existingSeries.dataPoints.push({ x: timeNow, y: coinValue });
        });

        // Render the updated chart
        $("#chartContainer").CanvasJSChart(options);
    });
};

//Chart Options
const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: { text: "Coins&Value" },
    axisX: { 
        title: "Time",
        valueFormatString: "H:mm:ss",
        interval: 2, //
        intervalType: "second" 
    },
    axisY: {
        title: "Coin Value (USD)",
    },
    data: []
};

//Fetching the more information coin option
const fetchCoinData = (coinId, modalId) => {
    const searchURL ="https://api.coingecko.com/api/v3/coins/";
    $('#loadingSpinner').show();

    const cachedData = JSON.parse(localStorage.getItem(coinId));
    if (cachedData && Date.now() - cachedData.timestamp < 120000) {
        displayCoinModal(cachedData.data, modalId);
    } else {
        $.get(searchURL+coinId, (data) => {
            localStorage.setItem(coinId, JSON.stringify({ data: data, timestamp: Date.now() }));
            displayCoinModal(data, modalId);
        });
    }
};

//Displaying the information of the coin in the opened modal
const displayCoinModal = (data, modalId) => {
    const modal = $(`#${modalId}`);
    modal.find(".modal-header").html(`<h2 class="modal-title" id="modalHeader">${data.id}</h2>`);
    modal.find(".modal-body").html(`
        <div id="coinImage"><img src="${data.image.large}"></div>
        <div id="priceUsd">${data.market_data.current_price.usd}$</div>
        <div id="priceEur">${data.market_data.current_price.eur}€</div>
        <div id="priceIls">${data.market_data.current_price.ils}₪</div>
    `);
    modal.find(".modal-footer").html(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`);

    $('#loadingSpinner').hide();
    modal.modal("show");
};

//Building and display the 100 coins from the coins list in the main page
const builtCoinsTab = (data)=>{
    const newArray = [];
    const randomNumberArray = [];
    //Making array of 100 random numbers without repeating itself
    while (randomNumberArray.length < 100) {
        let randomNum = Math.floor(Math.random() * 12805) + 103; 
        if (randomNumberArray.indexOf(randomNum) === -1) {
            randomNumberArray.push(randomNum);
            }
    }
    //Making array of 100 random coins
    for (let index=0; index<randomNumberArray.length;index++){
        newArray.push(data[randomNumberArray[index]]);
    }
    //Building the 100 coins
    for(let index=0; index<newArray.length; index++){
        $(".row").append(`
            <div class="card col-sm-3" >
                <div class="card-body d-flex flex-column">
                    <!--Toggle button-->
                    <div class="form-check form-switch ms-auto">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    </div>
                    <!--Coin Symbol-->
                    <h5 class="card-title me-auto" id="cardTitle">${newArray[index].symbol.toUpperCase()}</h5>
                    <!--Coin ID-->
                    <p class="card-text me-auto" id="cardName">${newArray[index].id}</p>
                    <!--Button to Open the Modal-->
                    <button type="button" class="modalButton btn btn-primary me-auto" data-toggle="modal" data-target="#infoModal">
                        More Info
                    </button>
                    <!-- The Modal -->
                    <div class="modal" id="infoModal${index}"">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header"></div>
                                <!-- Modal body -->
                                <div class="modal-body"></div>
                                <!-- Modal footer -->
                                <div class="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
}

//Saving the coins list to local storage
const saveCoins = (data)=>{
    localStorage.setItem("myCoins",JSON.stringify(data));
}

//Building and display the "About" section
const aboutTab = ()=>{
    $("#aboutTab").empty().append(`
        <div class="row" >
            <!--Application Info-->
            <div class="col-sm-9">
                <span>
                My Name is Dmitry Kuznets more information about me you can find at the right side of the page.
                As a part of our Full stack developer course at John Bryce Collage ,we had project to develop singe page application
                that provides information and live reports on Crypto Currency in the virtual trading.
                </span><br/>
                <span>
                Our singe page application must show 100 crypto coins, the data about them we get by calling specific API's using Ajax and Jquery.
                All the data we get from the API's is saved on the clint side.
                </span><br/>
                <span>
                Every coin is shown as bootstrap card with id,symbol, "More Info" button and toggle switch.
                When you click on "More Info" button ,modal window will show up and you will can see more information about the coin' 
                the information is about full name of the coin, image and the market prices.
                </span><br/>
                <span>
                Also if you want to search for specific coin you can do that by writing the crypto coin id,for example 
                if you want to get information about "Bitcoin" you need to enter "btc" and etc, after that you need to click on the "Search" button
                on the navigation bar.
                </span><br/>
                <span>
                For go back to the coins tab you need to click on the "Home" button.
                With the toggle switches you can choose up to 5 coins and see the market price changing in dynamic report by clicking on the "Live report"
                button on the navigation bar.
                </span><br/>
                <span>
                For the end the "About" button will be show you this information you read about the project.
                </span><br/>
            </div>
            <!--Picture and information-->
            <div class="col-sm-3 ">
                <img src="/images/avatar.png" class="img-fluid img-thumbnail " id="avatarImg">
                <div>
                    <table class="table table-striped">
                        <tr>
                            <th>Name</th>
                            <td>Dmitry Kuznets</td>
                        </tr>
                        <tr>
                            <th>Birth</th>
                            <td>1992</td>
                        </tr>
                        <tr>
                            <th>Living</th>
                            <td>Kiryat Motzkine</td>
                        </tr>
                        <tr>
                            <th>Education</th>
                            <td>B.S.N</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `)
}

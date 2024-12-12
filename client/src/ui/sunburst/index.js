let Sunburst = {};

Sunburst.render = function(data, month, target){
    
    for (let elt of data) {
        if(elt.month == month){
            data = elt;
            break;
        }
    }

    console.log(data);

    /* RAPPEL : FORMAT DES DONNEES

    new_data = {
        month: "2020-01",
        countries: [
            {
                name: "France",
                cities: [
                    {
                        name: "Paris",
                        orders: [order]
                    },
                    {
                        name: "Lyon",
                        orders: [order]
                    }
                ]
            }
        ]
    }

    */

    let chartData = [
        {
            id: "Total",
            text: "Total",
            parent: "",
        },
        // Le reste est dynamique
    ];

    for (let country of data.countries) {
        let countryData = {
            id: country.name,
            text: country.name,
            parent: "Total",
        };

        let country_value = 0;
        for (let city of country.cities) {
            let cityData = {
                id: city.name,
                text: city.name,
                parent: country.name,
                value: city.orders.length,
            };
            country_value += city.orders.length;
            chartData.push(cityData);
        }

        countryData.value = country_value;

        chartData.push(countryData);
    }

    let chartConfig = {
        type: 'sunburst',
        options: {
            root: "Total",
        },
        plot: {
            valueBox:{
                text: "%data-vbtext",
                fontSize: '12px',
                color: '#000',
                visible: null
            }
        },
        series: chartData
    };

    zingchart.render({
        id: target,
        data: chartConfig,
        height: '100%',
        width: '100%'
    });
}

export { Sunburst };
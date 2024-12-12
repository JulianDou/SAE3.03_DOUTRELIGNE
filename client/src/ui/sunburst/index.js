let Sunburst = {};

Sunburst.render = function(data, month, target){

    /* RAPPEL : FORMAT DES DONNEES

    new_data = {
        mois: {
            pays: {
                ville: [commandes],
                ville: [commandes]
            },
            pays: {
                ville: [commandes]
            }
        },
        mois: {
            ...
        }
    }

    */

    data = data[month];

    let chartData = [
        {
            id: "Total",
            text: "Total",
            parent: "",
        },
        // Le reste est dynamique
    ];

    for (let country in data) {
        let countryData = {
            id: country,
            text: country,
            parent: "Total",
            value: data[country].length
        };
        chartData.push(countryData);

        for (let city in data[country]) {
            let cityData = {
                id: city,
                text: city,
                parent: country,
                value: data[country][city].length
            };
            chartData.push(cityData);
        }
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
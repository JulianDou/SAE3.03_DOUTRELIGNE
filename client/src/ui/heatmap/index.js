let Heatmap = {};

Heatmap.render = function(data, target) {

    let new_data = [];
    let months = [];
    let countries = [];

    let max = 0;

    for (let elt of data){

        // On ajoute le mois à la liste des mois
        months.push(elt.month);

        for (let country of elt.countries){

            // On réduit la taille des nom des pays
            if (country.name.length > 4){
                if (country.name == "United Kingdom"){
                    country.name = "U.K.";
                }
                else {
                    country.name = country.name.substring(0, 4) + ".";
                }
            }

            // On calcule la valeur totale du pays
            let country_value = 0;
            for (let city of country.cities){
                country_value += city.orders.length;
            }
            
            // On ajoute, s'il n'y est pas, le pays à la liste
            if (!countries.includes(country.name)){
                countries.push(country.name);
                new_data.push(
                    {
                        values: [country_value],
                        reference: 'chart-max',
                    }
                );
            }
            else {
                new_data[countries.indexOf(country.name)].values.push(country_value);
            }

            if (country_value > max){
                max = country_value;
            }
        }
    }

    let palette = [
        "#235ac4",
        "#6fe2c8",
        "#ffb900",
        "#ff3200",
    ];

    let rules = [
        '%v >= 0 && %v < ' + max/5,
        '%v >= ' + max/5 + ' && %v < ' + max/5*2,
        '%v >= ' + max/5*2 + ' && %v < ' + max/5*3,
        '%v >= ' + max/5*3,
    ];

    let chartConfig = {

        plot:{
            rules: [
                {
                    backgroundColor: palette[0],
                    rule: rules[0],
                },
                {
                    backgroundColor: palette[1],
                    rule: rules[1],
                },
                {
                    backgroundColor: palette[2],
                    rule: rules[2],
                },
                {
                    backgroundColor: palette[3],
                    rule: rules[3],
                }
            ]
        },

        title: {
            text: "Ventes par pays, par mois",
            align: 'center',
            fontColor: '#000',
            fontFamily: 'Open Sans',
            fontSize: '25px'
        },
          subtitle: {
            text: "Sur les 12 derniers mois",
            align: 'center',
            fontColor: '#444',
            fontFamily: 'Open Sans',
            fontSize: '12px',
        },
        scaleY: {
            values: countries,
        },
        scaleX: {
            values: months,
        },
        type: 'heatmap',
        series: new_data,
    };

    zingchart.render({
        id: target,
        data: chartConfig,
        height: "100%",
        width: "100%",
    });
};

export { Heatmap };
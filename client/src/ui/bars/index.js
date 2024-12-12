let Bars = {};

Bars.render = function(productData, target){

    // Exemple de data à obtenir
    // [{
    //     values: [20, 40, 25, 50, 15, 45, 33, 34]
    //   },
    //   {
    //     values: [5, 30, 21, 18, 59, 50, 28, 33]
    //   },
    //   {
    //     values: [30, 5, 18, 21, 33, 41, 29, 15]
    //   }
    // ]

    let sortedData = {
        dairies: 0,
        meat: 0,
        fruits: 0,
        vegetables: 0,
        bakery: 0
    }

    for (let product of productData){
        if (product.category == "Dairy"){
            sortedData.dairies += product.quantity;
        } else if (product.category == "Meat"){
            sortedData.meat += product.quantity;
        } else if (product.category == "Fruits"){
            sortedData.fruits += product.quantity;
        } else if (product.category == "Vegetables"){
            sortedData.vegetables += product.quantity;
        } else if (product.category == "Bakery"){
            sortedData.bakery += product.quantity;
        }
    }

    let new_data = [
        {
            values: [sortedData.dairies],
            text: "Produits Laitiers",
            backgroundColor: "#d7c687"
        },
        {
            values: [sortedData.meat],
            text: "Viande",
            backgroundColor: "#ec857f"
        },
        {
            values: [sortedData.fruits],
            text: "Fruits",
            backgroundColor: "#28ae71"
        },
        {
            values: [sortedData.vegetables],
            text: "Légumes",
            backgroundColor: "#94bd54"
        },
        {
            values: [sortedData.bakery],
            text: "Boulangerie",
            backgroundColor: "#da9660"
        }
    ];

    let chartConfig = {
        type: "bar",
        series: new_data,
        legend: {},
        scaleX: {
            labels: [""],
        },
    };

    zingchart.render({
        id: target,
        data: chartConfig,
        height: '100%',
        width: '100%',
      });

};

export { Bars };
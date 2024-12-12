let Camembert = {};

Camembert.render = function(productData, target){

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

// CHART CONFIG
// -----------------------------
let chartConfig = {
  type: 'pie',
  series: new_data,
  legend: {},
};

// RENDER CHARTS
// -----------------------------
zingchart.render({
  id: target,
  data: chartConfig,
  height: '100%',
  width: '100%',
});

}

export { Camembert };
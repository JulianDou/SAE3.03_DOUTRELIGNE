let Graph = {};

// Exemple de data
// {
//   names: ["2024-08", "2024-09", etc.]
//   values: [4, 20, 15, 10, 8, 18],
// }

Graph.render = function(data, mode){

let values = [];
if (mode == "single"){
  values = [{"values": data.values}];
  values[0].text = "Total des ventes";
}
else if (mode == "multiple"){
  for (let i = 0; i < data.values.length; i++){
    values.push({"values": data.values[i]});
  }
  values[4] = {
    values: data.values[4],
    "line-color": "#daef7a",
    marker: {
      "background-color": "#daef7a"
    },
    text: "Légumes"
  }
  values[3] = {
    values: data.values[3],
    "line-color": "#fde5b1",
    marker: {
      "background-color": "#fde5b1"
    },
    text: "Produits Laitiers"
  }
  values[2] = {
    values: data.values[2],
    "line-color": "#ec857f",
    marker: {
      "background-color": "#ec857f"
    },
    text: "Viande"
  }
  values[1] = {
    values: data.values[1],
    "line-color": "#91ca76",
    marker: {
      "background-color": "#91ca76"
    },
    text: "Fruits"
  }
  values[0] = {
    values: data.values[0],
    "line-color": "#da9660",
    marker: {
      "background-color": "#da9660"
    },
    text: "Boulangerie"
  }
}


// CHART CONFIG
// -----------------------------
let chartConfig = {
  type: 'line',
  backgroundColor: '#fff',
  title: {
    text: 'Total des ventes',
    align: 'center',
    fontColor: '#000',
    fontFamily: 'Open Sans',
    fontSize: '25px'
  },
  legend: {

  },
  subtitle: {
    text: 'Ces 6 derniers mois',
    align: 'center',
    fontColor: '#777',
    fontFamily: 'Open Sans',
    fontSize: '12px',
  },
  scaleX: {
    labels: data.names
  },
  series: values,
};

// RENDER CHARTS
// -----------------------------
zingchart.render({
  id: 'sales-graph',
  data: chartConfig,
  height: '100%',
  width: '100%',
});

}

export { Graph };
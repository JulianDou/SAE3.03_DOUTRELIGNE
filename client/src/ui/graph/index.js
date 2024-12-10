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
  values[4].text = "Légumes";
  values[3].text = "Produits Laitiers";
  values[2].text = "Viande";
  values[1].text = "Fruits";
  values[0].text = "Boulangerie";
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
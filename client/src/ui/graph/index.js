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
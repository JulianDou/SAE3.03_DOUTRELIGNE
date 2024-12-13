let Graph = {};

// Exemple de data
// {
//   names: ["2024-08", "2024-09", etc.]
//   values: [4, 20, 15, 10, 8, 18],
// }

Graph.render = function(data, mode, target, title, subtitle){

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
    "line-color": "#94bd54",
    marker: {
      "background-color": "#94bd54"
    },
    text: "Légumes"
  }
  values[3] = {
    values: data.values[3],
    "line-color": "#6fd6be",
    marker: {
      "background-color": "#6fd6be"
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
    "line-color": "#28ae71",
    marker: {
      "background-color": "#28ae71"
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
    text: title,
    align: 'center',
    fontColor: '#000',
    fontFamily: 'Open Sans',
    fontSize: '25px'
  },
  subtitle: {
    text: subtitle,
    align: 'center',
    fontColor: '#444',
    fontFamily: 'Open Sans',
    fontSize: '12px',
  },
  scaleX: {
    labels: data.names
  },
  series: values,
};

if (mode == "multiple"){
  chartConfig.legend = {};
}

// RENDER CHARTS
// -----------------------------
zingchart.render({
  id: target,
  data: chartConfig,
  height: '100%',
  width: '100%',
});

}

export { Graph };
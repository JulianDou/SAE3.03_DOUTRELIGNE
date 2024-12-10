let Camembert = {};

// Exemple de data
// {
//   text: 'IE and Edge',
//   values: [4.8],
//   backgroundColor: '#50ADF5'
// }

Camembert.render = function(data){
// CHART CONFIG
// -----------------------------
let chartConfig = {
  type: 'pie',
  backgroundColor: '#fff',
  title: {
    text: 'Produits les plus vendus',
    align: 'center',
    fontColor: '#000',
    fontFamily: 'Open Sans',
    fontSize: '25px'
  },
  subtitle: {
    text: 'Ces 2 derniers mois',
    align: 'center',
    fontColor: '#000',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    offsetY: '10px'
  },
  plot: {
    tooltip: {
      text: '%npv%',
      padding: '5px 10px',
      fontFamily: 'Open Sans',
      fontSize: '18px'
    },
    valueBox: {
      text: '%t\n%npv%',
      fontFamily: 'Open Sans',
      placement: 'out'
    },
    animation: {
      effect: 'ANIMATION_EXPAND_VERTICAL',
      method: 'ANIMATION_REGULAR_EASE_OUT',
      sequence: 'ANIMATION_BY_PLOT',
      speed: 500
    },
    borderColor: '#fff',
    borderWidth: '4px'
  },
  plotarea: {
    margin: '20px 0 0 0'
  },
  series: data
};

// RENDER CHARTS
// -----------------------------
zingchart.render({
  id: 'top3-products',
  data: chartConfig,
  height: '100%',
  width: '100%',
});

}

export { Camembert };
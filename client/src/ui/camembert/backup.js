let CamembertView = {};

CamembertView.items = [];

CamembertView.formatData = function(data){
    let formattedData = [];
    data.forEach((item) => {
        formattedData.push({
            text: item.product_name,
            values: item.quantity_sold,
            backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
    });
    CamembertView.items = formattedData;
}

// RENDER CHARTS
// -----------------------------
CamembertView.render = function(data){
    CamembertView.formatData(data);
    
    // CHART CONFIG
    // -----------------------------
    CamembertView.chartConfig = {
      type: 'pie',
      backgroundColor: '#FFFFFF',
      title: {
        text: 'Global Browser Usage',
        align: 'center',
        fontColor: '#000',
        fontFamily: 'Open Sans',
        fontSize: '1.5rem',
        offsetX: '0px',
      },
      subtitle: {
        text: 'Ces 2 derniers mois',
        align: 'center',
        fontColor: '#000000',
        fontFamily: 'Open Sans',
        fontSize: '1rem',
        offsetX: '0px',
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
        borderColor: '#2B313B',
        borderWidth: '5px'
      },
      plotarea: {
        margin: '20px 0 0 0'
      },
      source: {
        text: '',
        fontColor: '#8e99a9',
        fontFamily: 'Open Sans',
        textAlign: 'left'
      },
      series: CamembertView.items,
    };

    zingchart.render({
        id: 'top3-products',
        data: CamembertView.chartConfig,
        height: '100%',
        width: '100%',
    });
}

export { CamembertView };
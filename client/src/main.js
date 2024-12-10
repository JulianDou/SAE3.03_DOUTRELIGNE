import { HeaderView } from "./ui/header/index.js";
import { BasicCounterView } from "./ui/basic-counter/index.js";

import { Camembert } from "./ui/camembert/index.js";

import { ordersData } from "./data/commandes.js";
import { productsData } from "./data/produits.js";



let C = {};

C.init = async function(){
    V.init();

    C.loadCounters();

    C.loadCamembert();
}

C.loadCounters = async function(){
    let pendingCount = await ordersData.getOrderByStatus("Pending");
    pendingCount = pendingCount.length;
    let shippedCount = await ordersData.getOrderByStatus("Shipped");
    shippedCount = shippedCount.length;
    let deliveredCount = await ordersData.getOrderByStatus("Delivered");
    deliveredCount = deliveredCount.length;
    V.renderBasicCounter(pendingCount, shippedCount, deliveredCount);
}

// Exemple de data
// {
//   text: 'IE and Edge',
//   values: [4.8],
//   backgroundColor: '#50ADF5'
// }

C.loadCamembert = async function(){
    let data = await productsData.getTop3Products();
    let camembertData = [];
    for (let elt of data){
        let color = C.colorOfCategory(elt.category);
        let obj = {
            text: elt.product_name,
            values: [elt.quantity_sold],
            backgroundColor: color
        }
        camembertData.push(obj);
    }
    console.log(camembertData);
    V.renderCamembert(camembertData);
}

C.colorOfCategory = function(category){
    switch(category){
        case "Dairy":
            return "#FFD700";

        case "Meat":
            return "#FF0000";
        
        case "Fruits":
            return "#008000";
        
        case "Vegetables":
            return "#FFA500";
        
        case "Bakery":
            return "#FF1493";
    }
}

let V = {
    header: document.querySelector("#header"),
    basicCounters: document.querySelector("#basic-counters")
};

V.init = function(){
    V.renderHeader();
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.renderBasicCounter = function(pendingCount, shippedCount, deliveredCount){
    V.basicCounters.innerHTML = BasicCounterView.render(pendingCount, "En Attente");
    V.basicCounters.innerHTML += BasicCounterView.render(shippedCount, "En Cours");
    V.basicCounters.innerHTML += BasicCounterView.render(deliveredCount, "Livrées");
}

V.renderCamembert = function(data){
    Camembert.render(data);
}


C.init();
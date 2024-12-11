import { HeaderView } from "./ui/header/index.js";
import { BasicCounterView } from "./ui/basic-counter/index.js";

import { Camembert } from "./ui/camembert/index.js";
import { Graph } from "./ui/graph/index.js";

import { ordersData } from "./data/commandes.js";
import { productsData } from "./data/produits.js";


let C = {};

C.init = async function(){
    V.init();

    C.loadCounters();

    C.loadCamembert();

    C.loadGraph();
}

C.loadCounters = async function(){
    let pendingCount = await ordersData.getOrderByStatus("Pending");
    let shippedCount = await ordersData.getOrderByStatus("Shipped");
    let deliveredCount = await ordersData.getOrderByStatus("Delivered");
    V.renderBasicCounter(pendingCount, shippedCount, deliveredCount);
}

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
    V.renderCamembert(camembertData);
}

C.loadGraph = async function(){
    let data = await ordersData.getTotal("false");
    V.renderGraph(data, "single");
    document.querySelector("#sales-graph-btns").addEventListener("click", C.handler__graphBtns);
}

C.handler__graphBtns = async function(event){
    let mode = event.target.dataset.mode;
    if (mode == "single"){
        let data = await ordersData.getTotal("false");
        V.renderGraph(data, "single");
    }
    else if (mode == "multiple"){
        let data = await ordersData.getTotal("true");
        V.renderGraph(data, "multiple");
    }
}

C.colorOfCategory = function(category){
    switch(category){
        case "Dairy":
            return "#fde5b1";

        case "Meat":
            return "#ec857f";
        
        case "Fruits":
            return "#91ca76";
        
        case "Vegetables":
            return "#daef7a";
        
        case "Bakery":
            return "#da9660";
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

V.renderGraph = function(data, mode){
    Graph.render(data, mode);
}


C.init();
import { HeaderView } from "./ui/header/index.js";
import { BasicCounterView } from "./ui/basic-counter/index.js";

import { Podium } from "./ui/podium/index.js";
import { Graph } from "./ui/graph/index.js";

import { ordersData } from "./data/commandes.js";
import { productsData } from "./data/produits.js";


let C = {};

C.init = async function(){
    V.init();

    C.loadCounters();

    C.loadTop3();

    C.loadGraph();
}

C.loadCounters = async function(){
    let pendingCount = await ordersData.getOrderByStatus("Pending");
    let shippedCount = await ordersData.getOrderByStatus("Shipped");
    let deliveredCount = await ordersData.getOrderByStatus("Delivered");
    V.renderBasicCounter(pendingCount, shippedCount, deliveredCount);
}

C.loadTop3 = async function(){
    let data = await productsData.getTop3Products();
    let top3Data = [];
    for (let elt of data){
        let color = elt.category.toLowerCase();
        let obj = {
            text: elt.product_name,
            values: elt.quantity_sold,
            backgroundColor: color
        }
        top3Data.push(obj);
    }
    V.renderTop3(top3Data);
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

let V = {
    header: document.querySelector("#header"),
    basicCounters: document.querySelector("#basic-counters"),
    top3: document.querySelector("#top3-products"),
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

V.renderTop3 = function(data){
    V.top3.innerHTML = Podium.render(data);
}

V.renderGraph = function(data, mode){
    Graph.render(data, mode);
}


C.init();
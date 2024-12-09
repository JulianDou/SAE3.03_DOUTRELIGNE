import { HeaderView } from "./ui/header/index.js";
import { BasicCounterView } from "./ui/basic-counter/index.js";

import "./ui/test/index.js";

import { ordersData } from "./data/commandes.js";



let C = {};

C.init = async function(){
    V.init();

    let pendingCount = await ordersData.getOrderByStatus("Pending");
    pendingCount = pendingCount.length;
    let shippedCount = await ordersData.getOrderByStatus("Shipped");
    shippedCount = shippedCount.length;
    let deliveredCount = await ordersData.getOrderByStatus("Delivered");
    deliveredCount = deliveredCount.length;
    V.renderBasicCounter(pendingCount, shippedCount, deliveredCount);
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
    V.basicCounters.innerHTML = BasicCounterView.render(pendingCount);
    V.basicCounters.innerHTML += BasicCounterView.render(shippedCount);
    V.basicCounters.innerHTML += BasicCounterView.render(deliveredCount);
}


C.init();
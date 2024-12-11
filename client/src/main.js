import { HeaderView } from "./ui/header/index.js";
import { BasicCounterView } from "./ui/basic-counter/index.js";

import { Podium } from "./ui/podium/index.js";
import { Graph } from "./ui/graph/index.js";
import { LowStock } from "./ui/lowstock/index.js";
import { List } from "./ui/listelement/index.js";
import { Customer } from "./ui/customer/index.js";

import { ordersData } from "./data/commandes.js";
import { productsData } from "./data/produits.js";
import { customersData } from "./data/clients.js";


let C = {};

C.init = async function(){
    V.init();

    C.loadCounters();

    C.loadTop3();

    C.loadGraph();

    C.loadLowStock();

    C.loadProduct(1);
    C.loadProductList();

    C.loadCustomer(1);
    C.loadCustomerList();
}

C.loadCounters = async function(){
    let pendingCount = await ordersData.getOrderByStatus("Pending");
    let shippedCount = await ordersData.getOrderByStatus("Shipped");
    let deliveredCount = await ordersData.getOrderByStatus("Delivered");
    V.renderBasicCounter(pendingCount, shippedCount, deliveredCount);
}

C.loadTop3 = async function(){
    let data = await productsData.getTop3Products();
    V.renderTop3(data);
}

C.loadGraph = async function(){
    let data = await ordersData.getTotal("false");
    V.renderGraph(data, "single");
    document.querySelector("#sales-graph-btns").addEventListener("click", C.handler__graphBtns);
}

C.loadLowStock = async function(){
    let data = await productsData.getLowStock();
    V.renderLowStock(data);
}

C.loadProduct = async function(id){
    let data = await productsData.getProduct(id);
    V.renderProduct(data);
}

C.loadProductList = async function(){
    let data = await productsData.getProducts();
    V.renderProductList(data);
    V.productlist.addEventListener("click", C.handler__productList);
}

C.loadCustomer = async function(id){
    let customerData = await customersData.getCustomer(id);
    let productsData = await ordersData.getByCustomer(id);
    V.renderCustomer(customerData, productsData);
    document.querySelector("#client-product-list").addEventListener("click", C.handler__productList);
}

C.loadCustomerList = async function(){
    let data = await customersData.getCustomers();
    V.renderCustomersList(data);
    V.customerslist.addEventListener("click", C.handler__customerList);
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

C.handler__productList = async function(event){
    if (event.target.id == "list-elt"){
        let id = event.target.dataset.id;
        C.loadProduct(id);
    }
}

C.handler__customerList = async function(event){
    if (event.target.id == "list-elt"){
        let id = event.target.dataset.id;
        C.loadCustomer(id);
    }
}

let V = {
    header: document.querySelector("#header"),
    basicCounters: document.querySelector("#basic-counters"),
    top3: document.querySelector("#top3-products"),
    lowStock: document.querySelector("#lowstock-products"),
    productlist: document.querySelector("#product-select"),
    customerslist: document.querySelector("#customer-select"),
    customerinfo: document.querySelector("#client-info"),
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
    Graph.render(data, mode, "sales-graph", "Total des ventes", "Ces 6 derniers mois");
}

V.renderLowStock = function(data){
    V.lowStock.innerHTML = LowStock.render(data);
    V.lowStock.children[1].firstChild.remove(); // enlève un "undefined" qui s'affichait
    LowStock.color();
}

V.renderProduct = function(data){
    Graph.render(data.data, "single", "product-sales", "Ventes pour le produit :", data.name);
}

V.renderProductList = function(data){
    V.productlist.innerHTML = List.render(data);
}

V.renderCustomer = function(customerData, productsData){
    V.customerinfo.innerHTML = Customer.render(customerData, productsData);
}

V.renderCustomersList = function(data){
    V.customerslist.innerHTML = List.render(data);
}


C.init();
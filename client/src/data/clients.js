import { getRequest } from "../lib/api-request.js";

let customersData = {};


customersData.getCustomers = async function(){
    let data = await getRequest("clients");
    return data;
}

customersData.getCustomer = async function(id){
    let data = await getRequest("clients?id=" + id);
    return data;
}

export { customersData };
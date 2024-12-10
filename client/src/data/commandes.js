import { getRequest } from "../lib/api-request.js";

let ordersData = {};    


ordersData.getOrderByStatus = async function(status){
    let data = await getRequest(`commandes?status=${status}`);
    data = data.count;
    return data;
}

ordersData.getTotal = async function(mode){
    let data = await getRequest("commandes?stat=total&sorted="+mode);
    data.reverse();
    let names = [];
    let values = [];
    for (let product of data){
        product.total_value = parseFloat(product.total_value);
        names.push(product.month);
        values.push(product.total_value);
    }
    data = {
        names: names,
        values: values
    }
    console.log(data);
    return data;
}

export { ordersData };
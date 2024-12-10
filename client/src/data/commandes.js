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
    if (mode == "true"){
        let names = [];
        let i = 0;
        while (i < data.length){
            names.push(data[i].month);
            i+=5;
        }
        let values = [];
        let subvalue = [];
        for (let i = 0; i < data.length; i++) {
            let product = data[i].product;
            let totalValue = parseFloat(data[i].total_value);
            if (!subvalue[product]) {
            subvalue[product] = [];
            }
            subvalue[product].push(totalValue);
        }
        for (let key in subvalue) {
            values.push(subvalue[key]);
        }
        data = {
            names: names,
            values: values
        }
    }
    else if (mode == "false"){
        let names = [];
        let values = [];
        for (let date of data){
            date.total_value = parseFloat(date.total_value);
            names.push(date.month);
            values.push(date.total_value);
        }
        data = {
            names: names,
            values: values
        }
    }
    return data;
}

export { ordersData };
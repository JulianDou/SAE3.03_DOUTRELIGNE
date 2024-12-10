import { getRequest } from "../lib/api-request";

let salesData = {};

salesData.get6Months = async function(){
    let data = await getRequest("ventes");
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
    return data;
}

export { salesData };
import { getRequest } from "../lib/api-request";

let productsData = {};

productsData.getTop3Products = async function(){
    let data = await getRequest("produits?stat=top3");
    let new_data = [];
    for (let product of data){
        product.quantity_sold = parseInt(product.quantity_sold);
        let color = product.category.toLowerCase();
        let obj = {
            text: product.product_name,
            values: product.quantity_sold,
            backgroundColor: color
        }
        new_data.push(obj);
    }
    return new_data;
}

productsData.getLowStock = async function(){
    let data = await getRequest("produits?stat=lowstock");
    return data;
}

productsData.getProduct = async function(id){
    let data = await getRequest("produits?id=" + id);
    let names = [];
    let values = [];
    for (let date of data.data){
        date.total_value = parseFloat(date.total_value);
        names.push(date.month);
        values.push(date.total_value);
    }
    let new_data = {
        name: data.name.product_name,
        data: {
            names: names,
            values: values
        }
    }
    return new_data;
}

productsData.getProducts = async function(){
    let data = await getRequest("produits");
    return data;
}

export { productsData };
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

export { productsData };
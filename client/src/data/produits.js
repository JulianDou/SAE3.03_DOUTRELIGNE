import { getRequest } from "../lib/api-request";

let productsData = {};

productsData.getTop3Products = async function(){
    let data = await getRequest("produits?mode=top3");
    for (let product of data){
        product.quantity_sold = parseInt(product.quantity_sold);
    }
    return data;
}

export { productsData };
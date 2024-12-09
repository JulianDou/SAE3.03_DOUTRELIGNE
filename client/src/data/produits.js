import { getRequest } from "../lib/api-request";

let productsData = {};

productsData.getTop3Products = async function(){
    let data = await getRequest("produits?mode=top3");
    return data;
}
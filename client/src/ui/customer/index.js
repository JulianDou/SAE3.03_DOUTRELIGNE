const templateFile = await fetch("src/ui/customer/template.html");
const template = await templateFile.text();

import { genericRenderer } from "../../lib/utils.js";
import { List } from "../listelement/index.js";

let Customer = {};

Customer.render = function(customerData, productsData){
    let template_new = template;

    template_new = genericRenderer(template_new, customerData);

    let productData = {
        dairies: [],
        meat: [],
        fruits: [],
        vegetables: [],
        bakery: []
    }

    for (let product of productsData){
        if (product.category === "Dairy"){
            productData.dairies.push(product);
        } else if (product.category === "Meat"){
            productData.meat.push(product);
        } else if (product.category === "Fruits"){
            productData.fruits.push(product);
        } else if (product.category === "Vegetables"){
            productData.vegetables.push(product);
        } else if (product.category === "Bakery"){
            productData.bakery.push(product);
        }
    }

    for (let category in productData){
        let list = List.render(productData[category]);
        template_new = template_new.replace(`{{${category}}}`, list);
    }
    
    return template_new;
}

export { Customer };
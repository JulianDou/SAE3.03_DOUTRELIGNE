import { genericRenderer } from "../../lib/utils.js";

const templateFile = await fetch("src/ui/lowstock/template.html");
const template = await templateFile.text();
const templatebaseFile = await fetch("src/ui/lowstock/templatebase.html");
const templatebase = await templatebaseFile.text();

let LowStock = {};

LowStock.render = function(data){

    let templatebase_new = templatebase;
    let template_new = template;
    let products;
    let eltHTML;

    for (let elt of data){
        elt.color = elt.category.toLowerCase();
        eltHTML = genericRenderer(template_new, elt);
        products += eltHTML;
    }

    templatebase_new = templatebase_new.replace("{{products}}", products);

    return templatebase_new;
}

LowStock.color = function(){
    let products = document.querySelectorAll("#product-stock");
    for (let product of products){
        if (parseInt(product.innerText) == 0 ){
            product.style.backgroundColor = "#000";
        }
        else if (parseInt(product.innerText) <= 3 ){
            product.style.backgroundColor = "#d84141";
        }
        else if (parseInt(product.innerText) <= 6 ){
            product.style.backgroundColor = "#e49932";
        }
        else if (parseInt(product.innerText) <= 10 ){
            product.style.backgroundColor = "#e2c33d";
        }
        else {
            product.style.backgroundColor = "#93ae2a"
        }
    }
}

export { LowStock };
const templateFile = await fetch("src/ui/listelement/template.html");
const template = await templateFile.text();

import { genericRenderer } from "../../lib/utils.js";

let List = {};

List.render = function(data){

    let template_new = template;
    let final = "";

    for (let elt of data){
        template_new = template;
        if (elt.category){ // l'élément est un produit
            elt.color = elt.category.toLowerCase();
            elt.name = elt.product_name;
            if (elt.quantity){ // l'élément vient d'une fiche client
                elt.quantity = elt.quantity + "x";
            }
            else { // l'élément vient du module produits
                elt.quantity = elt.id + " -";
            }
            
        }
        else if (elt.firs_name) { // l'élément est un client
            elt.color = "white";
            elt.name = elt.firs_name + " " + elt.last_name;
            elt.quantity = elt.id + " -";
        }
        else { // l'élément est un mois
            elt.name = elt.month;
            elt.id = elt.name;
            elt.color = "white";
            elt.quantity = "";
        }
        template_new = genericRenderer(template_new, elt);
        final += template_new;
    }

    return final;
}

export { List } ;
const templateFile = await fetch("src/ui/listelement/template.html");
const template = await templateFile.text();

import { genericRenderer } from "../../lib/utils.js";

let List = {};

List.render = function(data){
    let template_new = template;
    let final = "";

    for (let elt of data){
        template_new = template;
        elt.color = elt.category.toLowerCase();
        template_new = genericRenderer(template_new, elt);
        final += template_new;
    }

    return final;
}

export { List } ;
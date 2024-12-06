import { genericRenderer } from "../../lib/utils.js"; 

const templateFile = await fetch("src/ui/article/template.html");
const template = await templateFile.text();


let ArticleView = {};

ArticleView.renderOne = function(obj){

    
    let d = new Date(obj.date);
    
    obj.date = "Le " + d.toLocaleDateString() + " à " + d.toLocaleTimeString().substring(0,5);
    
    let html = genericRenderer(template, obj);
   
    return html;
}

ArticleView.render = function(data){
    let html = "";
    for(let obj of data){
        html += ArticleView.renderOne(obj);
    }
    return html;
}



export {ArticleView};
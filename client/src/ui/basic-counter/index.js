const templateFile = await fetch("src/ui/basic-counter/template.html");
const template = await templateFile.text();


let BasicCounterView = {};

BasicCounterView.render = function(data){
    let template_new = template;
    template_new = template_new.replace("{{count}}", data);
    return template_new;
}



export {BasicCounterView};
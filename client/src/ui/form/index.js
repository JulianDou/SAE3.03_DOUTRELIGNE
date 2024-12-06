

const templateFile = await fetch("src/ui/form/template.html");
const template = await templateFile.text();


let FormView = {};

FormView.render = function(){
    return template;
}



export {FormView};
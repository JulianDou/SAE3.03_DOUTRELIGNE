const templateFile = await fetch("src/ui/podium/template.html");
const template = await templateFile.text();
const templatebaseFile = await fetch("src/ui/podium/templatebase.html");
const templatebase = await templatebaseFile.text();

let Podium = {};

// Exemple de data
// {
//   text: 'IE and Edge',
//   values: 4.8,
//   backgroundColor: '#50ADF5'
// }

Podium.render = function(data){

    let templatebase_new = templatebase;
    let template_new = template;

    // On formatte les éléments dans l'ordre du podium
    // (donc 3ème, 1er, 2ème)
    for (let i = 0; i < data.length; i++) {
        let text = data[i].text;
        let value = data[i].values;
        let backgroundColor = data[i].backgroundColor;

        template_new = template_new.replace(`{{text${i+1}}}`, text);
        template_new = template_new.replace(`{{values${i+1}}}`, value);
        template_new = template_new.replaceAll(`{{backgroundColor${i+1}}}`, backgroundColor);
    }

    templatebase_new = templatebase_new.replace('{{podium}}', template_new);

    return templatebase_new;
}

export { Podium };

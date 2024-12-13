import { getRequest } from "../lib/api-request.js";

let ordersData = {};    


ordersData.getOrderByStatus = async function(status){
    let data = await getRequest(`commandes?status=${status}`);
    data = data.count;
    return data;
}

ordersData.getTotal = async function(mode){
    let data = await getRequest("commandes?stat=total&sorted="+mode);
    data.reverse();
    if (mode == "true"){
        let names = [];
        let i = 0;
        while (i < data.length){
            names.push(data[i].month);
            i+=5;
        }
        let values = [];
        let subvalue = [];
        for (let i = 0; i < data.length; i++) {
            let product = data[i].product;
            let totalValue = parseFloat(data[i].total_value);
            if (!subvalue[product]) {
            subvalue[product] = [];
            }
            subvalue[product].push(totalValue);
        }
        for (let key in subvalue) {
            values.push(subvalue[key]);
        }
        data = {
            names: names,
            values: values
        }
    }
    else if (mode == "false"){
        let names = [];
        let values = [];
        for (let date of data){
            date.total_value = parseFloat(date.total_value);
            names.push(date.month);
            values.push(date.total_value);
        }
        data = {
            names: names,
            values: values
        }
    }
    return data;
}

ordersData.getByCustomer = async function(id){
    let data = await getRequest(`commandes?customer=${id}`);
    return data;
}

ordersData.getWorld = async function(){
    let data = await getRequest("commandes?stat=world");
    let new_data = {};

    /* FORMAT DES DONNEES

    [
        {
            "country": "Austria",
            "order_date": "2024-02-01",
            "total_quantity": "4"
        },
        {
            "country": "Sweden",
            "order_date": "2024-02-01",
            "total_quantity": "15"
        },
        ...
    ]
    
    */

    let months = {};
    for (let elt of data) {
        let month = elt.order_date.slice(0, -3);
        if (!months[month]) {
            months[month] = [];
        }
        months[month].push(elt);
    }

    new_data = [];

    for (let month in months) {
        let cur_month = months[month];
        let countries = [];
        for (let country of cur_month){
            let country_name = country.country;
            let total_quantity = parseInt(country.total_quantity);
            let existingCountry = countries.find(c => c.name === country_name);
            if (existingCountry) {
                existingCountry.total_quantity += total_quantity;
            } else {
                countries.push({
                    name: country_name,
                    total_quantity: total_quantity
                });
            }
        }
        new_data.push({
            month: month,
            countries: countries
        });
    }

    /* FORMAT FINAL DES DONNEES

    new_data = {
        {
            month: "2020-01",
            countries: [
                {
                    name: "France",
                    total_quantity: 12,
                }
            ]
        }
    }

    */

    return new_data;
}

export { ordersData };
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
        let countries = {};
        for (let order of months[month]) {
            let country = order.country;
            if (!countries[country]) {
                countries[country] = {};
            }
            let city = order.city;
            if (!countries[country][city]) {
                countries[country][city] = [];
            }
            countries[country][city].push(order);
        }
        let countriesArray = [];
        for (let country in countries) {
            let citiesArray = [];
            for (let city in countries[country]) {
                citiesArray.push({
                    name: city,
                    orders: countries[country][city]
                });
            }
            countriesArray.push({
                name: country,
                cities: citiesArray
            });
        }
        new_data.push({
            month: month,
            countries: countriesArray
        });
    }

    /* FORMAT FINAL DES DONNEES

    new_data = {
        {
            month: "2020-01",
            countries: [
                {
                    name: "France",
                    cities: [
                        {
                            name: "Paris",
                            orders: [order]
                        },
                        {
                            name: "Lyon",
                            orders: [order]
                        }
                    ]
                }
            ]
        }
    }

    */

    return new_data;
}

export { ordersData };
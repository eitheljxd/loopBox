
const data = {
    "fruits": [{
        "name": "Apple",
        "priceKg": 4.00,
        "qtyMg": [900, 400, 300]
    },
    {
        "name": "Avocado",
        "priceKg": 10.00,
        "qtyMg": [250, 450]
    }],
    "shiped": 1.00
};

calculatedBoxes(data);

function calculatedBoxes() {
    let totalAmount = 0;
    let qtyPackage = 0.0;
    let result = [];


    //Calculated quantity package
    data.fruits.map(object => {
        qtyPackage += object.qtyMg.reduce(function (a, b) {
            return (a + b);
        }, 0) / 1000;
    })
    qtyPackage = Math.ceil(qtyPackage);

    //Calculated total without package
    data.fruits.map(object => {
        const sumKg = object.qtyMg.reduce(function (a, b) {
            return (a + b);
        }, 0) / 1000;
        totalAmount += parseFloat(sumKg * object.priceKg);
    })
    //Calculated total with package
    totalAmount = totalAmount + (qtyPackage * 1);
    totalAmount = parseFloat(totalAmount).toFixed(2);

    //Distribute in packages
        //Initialize package
    for (let i = 0; i < qtyPackage; i++) {
        result.push([]);
    }
    let index = 0;
    let auxObject = [];
        //Reformat structure JSON
    data.fruits.map((object) => {
        object.qtyMg.map((qty) => {

            auxObject.push({
                id: index,
                name: object.name,
                qty,
                use: false
            })
            index++;

        })
    })
        //Validate and find elements with criteria
    let maxPk = 0;
    for (let i = 0; i < qtyPackage; i++) {
        do {
            const element = auxObject.filter(x => (x.qty + maxPk <= 1000) && !x.use)[0];
            if (element) {
                const foundIndex = auxObject.findIndex(x => x.id == element.id);
                auxObject[foundIndex].use = true;
                maxPk += element.qty;
                result[i].push(element.qty + " g " + element.name);
            } else {
                maxPk = 0;
                break;
            }

        } while (maxPk <= 1000)
    }

    console.log({
        price: '€ ' + totalAmount,
        result
    })
    return {
        price: '€ ' + totalAmount,
        result
    }


}

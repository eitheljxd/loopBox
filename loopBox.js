
const data = {
    "fruits": [{
        "name": "Apple",
        "priceKg": 4.00,
        "qtyMg": [250]
    }],
    // {
    //     "name": "Avocado",
    //     "priceKg": 10.00,
    //     "qtyMg": [300, 300]
    // }],
    "shiped": 1.00
};

console.log(calculatedBoxes(data));

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
    //Calculated price per package
    let detail = [];
    result.map(obj => {
      let price = 0;
      obj.map(item =>{
            const [number,metric, fruit] = item.split(" ");
            const priceKgPerFruit = data.fruits.find(x => x.name == fruit).priceKg;
            price += ((number*priceKgPerFruit)/ 1000);

      })
      detail.push({
        priceBox: '€ ' +parseFloat(price + (1*data.shiped)).toFixed(2),
        detail : obj
      })
    })

    return JSON.stringify({
        totalAmount: '€ ' + totalAmount,
        detail
    });


}

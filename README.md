# loopBox

Calculate the price of packages of fruit.


## Request Structure

Example of a response after executing the function.

```bash
{
  "fruits": [
    {
      "name": string,
      "priceKg": numer,
      "qtyMg": array
    } 
  ],
  "shiped": number
}
```


## Request Example

Example of a response after executing the function.

```bash
{
  "fruits": [
    {
      "name": "Apple",
      "priceKg": 1,
      "qtyMg": [
        300
      ]
    },
    {
      "name": "Avocado",
      "priceKg": 10,
      "qtyMg": [
        300
      ]
    },
    {
      "name": "Apple",
      "priceKg": 1,
      "qtyMg": [
        300
      ]
    },
    {
      "name": "Apple",
      "priceKg": 1,
      "qtyMg": [
        300
      ]
    },
    {
      "name": "Avocado",
      "priceKg": 10,
      "qtyMg": [
        300
      ]
    }
  ],
  "shiped": 1
}
```

## Response Example

Example of a response after executing the function.

```bash
{
  "totalAmount": "€ 8.90",
  "detail": [
    {
      "priceBox": "€ 4.60",
      "detail": [
        "300 g Apple",
        "300 g Avocado",
        "300 g Apple"
      ]
    },
    {
      "priceBox": "€ 4.30",
      "detail": [
        "300 g Apple",
        "300 g Avocado"
      ]
    }
  ]
}
```

[MIT](https://choosealicense.com/licenses/mit/)

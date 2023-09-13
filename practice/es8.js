// let userData = {
//     firstName: 'Martin',
//     lastName: 'Centurion',
//     age: 36,
//     email: 'martinalejandrocenturion@gmail.com',
//     city: 'Buenos Aires'
// }

// console.log(Object.entries(userData)); // Entradas

// console.log(Object.keys(userData)); // keys

// console.log(Object.values(userData)); // valores

let taxes = {
    tax1: 0.16,
    tax1: 0.18,
    tax1: 0.20,
    tax1: 0.22,
}

let taxesValues = Object.values(taxes);

console.log('taxesValues', taxesValues);

let totalTaxes = taxesValues.reduce((total,  tax, index) => {
    console.log('total', total);
    console.log('tax', tax);
    console.log('index', index);
    return total + tax;
}, 0)

console.log('totalTaxes', totalTaxes);
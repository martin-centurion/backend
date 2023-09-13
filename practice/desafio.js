const productos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
];

let allProducts = productos.reduce((result, item, index) => {
    Object.keys(item).forEach((key) => {
        if(!result.includes(key)) {
            result.push(key)
        }
    })
    return result;
},[])

let total = productos.reduce((result, item, index) => {
    Object.values(item).forEach(value => result += value)
    return result;
}, 0)

console.log('allProducts:', allProducts);
console.log('total:', total);
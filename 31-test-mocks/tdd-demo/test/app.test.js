import { sum } from "../app.js";

let result;
let testOk = 0;
let testFail = 0;

// algunos escenarios a plantear podrian ser:

// Test1. La función debe devolver null si algún parametro es numérico

console.log('Test1. La función debe devolver null si algún parametro es numérico');

result = sum(1, true)

if(result === null) {
    console.log('Test 1 > Ha pasado con exito ✅');
    testOk++;
} else {
    console.log('Test 1 > Ha fallado.');
    testFail++;
}

// La funcion debe devolver 0 si no se paso ningun parametro

console.log('Test2. La funcion debe devolver 0 si no se paso ningun parametro');

result = sum()

if(result === 0) {
    console.log('Test 2 > Ha pasado con exito.');
    testOk++;
} else {
    console.log('Test 2 > Ha fallado.');
    testFail++;
}

// La funcion debe poder realizar la suma correctamente

console.log('Test3. La funcion debe devolver 0 si no se paso ningun parametro');

result = sum(4, 3)

if(result === 7) {
    console.log('Test 3 > Ha pasado con exito.');
    testOk++;
} else {
    console.log('Test 3 > Ha fallado.');
    testFail++;
}

// la funcion debe poder hacer la suma con cualquier cantidad de numeros

console.log('Test4. La funcion debe devolver 0 si no se paso ningun parametro');

result = sum(4, 3, 3, 5)

if(result === 15) {
    console.log('Test 4 > Ha pasado con exito.');
    testOk++;
} else {
    console.log('Test 4 > Ha fallado.');
    testFail++;
}

console.log('Resumen:');
console.log('Pruebas exitosas', testOk);
console.log('Pruebas fallidas', testFail);

import { sum } from "../app.js";
       
let result;
let testOk = 0;
let testFail = 0;
// Algunos escenarios a plantear podrian ser:

// La función debe devolver null si algun parametro no es numerico
console.log('[TEST 1] La funcion debe devolver null sin algun parametro no es numerico');

result = sum(1, true)

if (result === null) {
    console.log('[TEST 1] ha pasado con exito ✅');
    testOk++;
} else {
    console.log('[TEST 1] ha fallado.');
    testFail++;
}

// La funcion debe devolver 0 sino se paso ningun parametro

console.log('[TEST 2] La funcion debe devolver 0 sino se paso ningun parametro');

result = sum();

if (result === 0) {
    console.log('[TEST 2] ha pasado con exito ✅');
    testOk++;
} else {
    console.log('[TEST 2] ha fallado.');
    testFail++;
}

// La funcion debe poder realizar la suma correctamente

console.log('[TEST 3] La funcion debe poder realizar la suma correctamente');

result = sum(4, 3);

if (result === 7) {
    console.log('[TEST 3] ha pasado con exito ✅');
    testOk++;
} else {
    console.log('[TEST 3] ha fallado.');
    testFail++;
}

// La funcion debe poder hacer la suma con cualquier cantidad de numeros

console.log('[TEST 4] La funcion debe poder hacer la suma con cualquier cantidad de numeros');

result = sum(4, 3, 3, 5);

if (result === 15) {
    console.log('[TEST 4] ha pasado con exito ✅');
    testOk++;
} else {
    console.log('[TEST 4] ha fallado.');
    testFail++;
}

console.log('Resumen:');
console.log('Pruebas exitosas', testOk);
console.log('Pruebas fallidas', testFail);


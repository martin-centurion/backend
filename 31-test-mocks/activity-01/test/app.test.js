import { login } from "../app.js";
       
let testOk = 0;
let testFail = 0;

//Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”)

console.log('[TEST 1] Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”)');
try {
    login('coderUser');
    throw new Error('No deberias estar aca.')
} catch (error) {
    if (error.message === 'No se ha proporcionado un password') {
        console.log('Test 1 paso ✅');
        testOk++;
    } else {
        console.log('Test 1 fallo:', error.message);
        testFail++;
    }
}

//Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”)

console.log('[TEST 2] Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”)');
try {
    login(undefined, '123');
    throw new Error('No deberias estar aca.')
} catch (error) {
    if (error.message === 'No se ha proporcionado un usuario') {
        console.log('Test 2 paso ✅');
        testOk++;
    } else {
        console.log('Test 2 fallo:', error.message);
        testFail++;
    }
}

//Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”)

console.log('[TEST 3] Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”)');
try {
    login('coderUser', 'querty');
    throw new Error('No deberias estar aca.')
} catch (error) {
    if (error.message === 'Contraseña incorrecta') {
        console.log('Test 3 paso ✅');
        testOk++
    } else {
        console.log('Test 3 fallo:', error.message);
        testFail++
    }
}

//Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)

console.log('[TEST 4] Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)');
try {
    login('coderUser1', '123');
    throw new Error('No deberias estar aca.')
} catch (error) {
    if (error.message === 'Credenciales incorrecta') {
        console.log('Test 4 paso ✅');
        testOk++
    } else {
        console.log('Test 4 fallo:', error.message);
        testFail++
    }
}

//Si  el usuario y contraseña coinciden, consologuear (“logueado”)

console.log('[TEST 5] Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)');
try {
    const result = login('coderUser', '123');
    if (result.message = 'logueado') {
        console.log('Test 5 paso ✅');
        testOk++
    } else {
        console.log('Test 5 fallo');
    }
} catch (error) {
    console.log(error.message);
    testFail++
}

console.log('Resumen:');
console.log('Pruebas exitosas', testOk);
console.log('Pruebas fallidas', testFail);
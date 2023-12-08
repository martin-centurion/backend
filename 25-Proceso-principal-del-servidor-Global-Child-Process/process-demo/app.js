process.on('exit', (code) => {
    if (code === -4 ) {
        console.log('Proceso finalizado por argumentacion invalida en una funcion.', code);
    } else {
        console.log('Proceso finalizado con exito');
    }
})

const listNumber = (...numbers) => {
    const types = numbers.map(item => (typeof item));
    const notNumber = types.find(type => type !== 'number');
    if (notNumber) {
        process.exit(-4)
    }
}

listNumber(1, 2, 5, "asaas");

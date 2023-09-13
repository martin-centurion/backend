function sumar(a , b) {
    console.log(this);
    this.variable = 'Hola Coder';
    console.log(this.variable);
    return a + b;
}

const resta = (a , b) => {
    return a - b;
}

const restav2 = (a , b) => a - b;


sumar(2,3);
console.log('fuera de la funcion', this.variable);


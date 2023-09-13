class Counter {

    static globalCount = 0;

    constructor(responsible) {
        this.responsible = responsible;
        this.count = 0;
    }

    getResponsible() {
        return this.responsible;
    }

    getIndividualCount() {
        return this.count;
    }

    static getGlobalCount() {
        return Counter.globalCount;
    }
    increment() {
        this.count++;
        Counter.globalCount++;
    }
}



const counter1 = new Counter('Juan');
counter1.increment();
counter1.increment();
const counter2 = new Counter('Martin');
counter2.increment();
const counter3 = new Counter('Lucia');
counter3.increment();

console.log('Juan', counter1.getIndividualCount());
console.log('Martin', counter2.getIndividualCount());
console.log('Lucia', counter3.getIndividualCount());

console.log('Global', Counter.getGlobalCount());
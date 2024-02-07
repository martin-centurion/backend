export const sum = (...numbers) => {
    if (numbers.length === 0) {
        return 0;
    }
    for (let index = 0; index < numbers.length; index++) {
        if (typeof numbers[index] !== 'number') {
            return null;
        }
    }
    /* const types = numbers.map(n => (typeof n));
    const isNotNumber = types.find(t => t !== 'number');
    if (isNotNumber) {
        return null;
    }; */
    return numbers.reduce((r, number) => (r + number), 0);
}
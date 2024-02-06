export const sum = (...numbers) => {
    if (numbers.length === 0) {
        return 0;
    }
    const types = numbers.map(n => (typeof n));
    const isNotNumber = types.find(t => t !== 'number');
    if (isNotNumber) {
        return null;
    };
    const result = numbers.reduce((r, number) => (r + number), 0);
    return result
}
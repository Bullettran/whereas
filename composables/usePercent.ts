export const usePercent = (val: number, percent: number) => {
    let amountToSubtract = (percent / 100) * val;
    return val - amountToSubtract
};
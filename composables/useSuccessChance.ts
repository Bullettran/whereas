export const useSuccessChance = (chance: number) => {
    const randomValue = Math.floor(Math.random() * 100); // Генерируем случайное число от 0 до 99
    return randomValue < chance; // Проверяем, попадает ли оно в диапазон успеха
};
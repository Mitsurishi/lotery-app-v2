import { WinningCondition } from "./types";

export const generateRandomArrNum = (requireCount: number, maxValue: number) => {
    const result: number[] = [];

    while (result.length < requireCount) {
        const randomNum = Math.floor(Math.random() * maxValue) + 1;

        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }

    return result;
};

export const compareArrays = (firstArray: number[], secondArray: number[]) => {
    let result = 0;

    firstArray.forEach((firstEl) => {
        secondArray.forEach((secondEl) => {
            if (firstEl === secondEl) {
                result++;
            }
        })
    });

    return result;
};

export const validateWin = (
    firstField: number[],
    secondField: number[],
    firstFieldWin: number[],
    secondFieldWin: number[],
    firstWinningCondition: WinningCondition,
    secondWinningCondition: WinningCondition,
) => {
    // Получаем количество совпавших выбранных значений с выигрышными
    const firstFieldMatch = compareArrays(firstField, firstFieldWin);
    const secondFieldMatch = compareArrays(secondField, secondFieldWin);

    // Проверяем условия выигрыша
    if (firstFieldMatch >= firstWinningCondition.firstField) {
        return true;
    }

    if ((firstFieldMatch >= secondWinningCondition.firstField) && secondFieldMatch) {
        return true;
    }

    return false;
};
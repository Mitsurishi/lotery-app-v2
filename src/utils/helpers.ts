export const generateRandomArrNum = (requireCount: number, maxValue: number) => {
    const result: number[] = [];

    while (result.length < requireCount) {
        const randomNum = Math.floor(Math.random() * maxValue) + 1;

        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }

    return result;
}

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
}
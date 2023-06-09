export const addZero = (num: number, length: number): string => {
    let res = `${num}`;

    if (num < 10) {
        for (let i = 1; i < length; i++) {
            res = `0` + res;
        }
    }

    return res;
}
export function useShuffler(arr, run) {
    const randomizedArray = [...arr];
    if (run) {
        const length = arr.length;
        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedArray[i], randomizedArray[j]] = [randomizedArray[j], randomizedArray[i]];
        }
    }

    return randomizedArray;
}
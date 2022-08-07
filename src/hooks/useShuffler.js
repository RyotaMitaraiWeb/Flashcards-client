export function useShuffler(arr, run) {
    if (run) {
        console.log('random');
        const length = arr.length;
        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    return arr;
}
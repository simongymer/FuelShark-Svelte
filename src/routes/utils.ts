export function getRangeStyle(min: number, max: number, value: number, disabled: boolean): string {
    min = Number(min);
    max = Number(max);
    value = Number(value);
    const progress = ((value - min) / (max - min)) * 100;

    return `background: linear-gradient(to right, ${disabled ? "rgb(136 131 131)" : "rgb(133 64 64)"} ${progress}%, rgb(52, 58, 64) ${progress}%)`;
}
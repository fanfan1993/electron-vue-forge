export const commonUtils = {
    renderLwh: (l: number, w: number, h: number, lengthUnitCode: string) => {
        return `${l}/${w}/${h}${lengthUnitCode}`;
    }
}
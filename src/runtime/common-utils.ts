export const commonUtils: CommonUtils = {
    renderLwh: (l: number, w: number, h: number, lengthUnitCode?: string) => {
        if (lengthUnitCode == null) {
            return `${l}/${w}/${h}`;
        }
        return `${l}/${w}/${h}${lengthUnitCode}`;
    }
}
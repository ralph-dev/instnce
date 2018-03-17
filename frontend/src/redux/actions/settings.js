export const FONT_SIZE_SET = "FONT_SIZE_SET";

export function setFontSize(fontSize) {
    return {
        type: FONT_SIZE_SET,
        payload: fontSize
    }
}
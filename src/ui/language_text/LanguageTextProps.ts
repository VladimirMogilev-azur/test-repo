import {TextStyleAlign, TextStyleFill, TextStyleFontStyle, TextStyleFontWeight} from "pixi.js";
import {TextCaseFormat} from "./TextCaseFormat";


export type LanguageTextProps = {
    key: string,
    fontSize: number,
    fill?: TextStyleFill,
    align?: TextStyleAlign,
    fontWeight?: TextStyleFontWeight,
    placeholders?: string[],
    textFormat?: TextCaseFormat,
    autoFitWidth?: number,
    centerAfterLanguageChanged?: boolean
    fontStyle?: TextStyleFontStyle
}
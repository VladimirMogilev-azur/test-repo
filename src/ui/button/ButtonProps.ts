import {Point, TextStyleFontWeight} from "pixi.js";
import {BgCornersSize} from "./button_props/BgCornersSize";


export type ButtonProps = {
    callback?: Function,
    bgTextureName?: string,
    bgCornersSize?: BgCornersSize,
    bgSizes?: Point,
    iconTextureName?: string,
    iconPosition?: Point,
    textKey?: string,
    fontSize?: number,
    fontColor?: number,
    textPosition?: Point,
    fontWeight?: TextStyleFontWeight,
    autoFitWidth?: number,
    disabledOffline?: boolean,
    clickEventName?: string,
    interactiveText?: boolean,
    withCooldown?: boolean,
    oneTimeOnly?: boolean
}
import { Texture} from "pixi.js";
import {TextCaseFormat} from "../../ui";


export type GetTextureData = {
    textureName: string,
    onComplete: (texture: Texture) => void
}

export type GetTextData = {
    textKey: string,
    placeholders: string[],
    textFormat: TextCaseFormat,
    onComplete: (text: string) => void
}
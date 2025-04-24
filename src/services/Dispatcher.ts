import {Texture} from "pixi.js";
import {FrameworkEvents} from "../FrameworkEvents";
import {TextCaseFormat} from "../ui";
import {GetTextData, GetTextureData} from "./dispatcher/DispatcherTypes";


export class Dispatcher {
    static getTexture(textureName: string): Texture {
        let resultTexture: Texture;
        let data: GetTextureData = {
            textureName: textureName,
            onComplete: (texture: Texture) => resultTexture = texture
        };
        dispatchEvent(new MessageEvent(FrameworkEvents.GET_TEXTURE, {data}));
        return resultTexture;
    }

    static getLanguageText(textKey: string, placeholders: string[] = [], textFormat?: TextCaseFormat): string {
        let resultText: string;
        let data: GetTextData = {
            textKey,
            placeholders,
            textFormat,
            onComplete: (text: string) => resultText = text
        };
        dispatchEvent(new MessageEvent(FrameworkEvents.GET_TEXT, {data}));
        return resultText;
    }
}
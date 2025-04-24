import {NineSlicePlane, Sprite, TilingSprite} from "pixi.js";
import {Dispatcher} from "../services";


export class DisplayObjectFactory {

    static createSprite(textureName?: string, autoFitWidth: number = 0): Sprite {
        let sprite: Sprite = new Sprite(textureName ? Dispatcher.getTexture(textureName) : undefined);
        if (autoFitWidth && sprite.width > autoFitWidth) {
            sprite.scale.set(autoFitWidth / sprite.width);
        }
        return sprite;
    }

    static createNineSlicePlane(
        textureName: string,
        leftWidth: number = 10,
        topHeight: number = leftWidth,
        rightWidth: number = leftWidth,
        bottomHeight: number = leftWidth): NineSlicePlane {
        return new NineSlicePlane(Dispatcher.getTexture(textureName), leftWidth, topHeight, rightWidth, bottomHeight);
    }

    // static createNineSlicePlane(
    //     textureName: string,
    //     leftWidth: number = 10,
    //     topHeight: number = 10,
    //     rightWidth: number = 10,
    //     bottomHeight: number = 10): NineSlicePlane {
    //     return new NineSlicePlane(Dispatcher.getTexture(textureName), leftWidth, topHeight, rightWidth, bottomHeight);
    // }

    static createTiling(textureName: string): TilingSprite {
        return new TilingSprite(Dispatcher.getTexture(textureName));
    }
}
